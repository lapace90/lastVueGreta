<script setup>
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

let user = ref([]);
let tasks = ref([]);


const route = useRoute();
const router = useRouter();

let userId = route.params.id * 1;


async function loadUser() {
    let json = await (
        await fetch(`${import.meta.env.VITE_API_URL}/v1/users/` + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
    ).json();
    user.value = json.data

    console.log('🚀 ~ user:', user.value)
}


async function saveUser() {
    let method = userId ? 'PUT' : 'POST';
    let url = userId ? `${import.meta.env.VITE_API_URL}/v1/users/${userId}` : `${import.meta.env.VITE_API_URL}/v1/user`;
    await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user.value)
    });
    router.push('/user/list');
}


onMounted(async () => {
    await loadUser()

})

async function deleteUser() {
    let method = 'DELETE'
    let url = `${import.meta.env.VITE_API_URL}/v1/user/${userId}`
    await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        }
    })
    router.push('/user/list')
}

</script>

<template>
    <form method="post">

        <div class="col-md-4 mx-auto">
            <label for="name" class="form-label">Name</label>
            <input class="form-control" v-model="user.name">
        </div>
      
        <div class="col-md-4 mx-auto">

            <label class="form-label" for="task">Task</label>
            <select v-model="user.taskId" class="form-select">
                <option v-for="task in tasks" :key="task.id" :value="task.name"> {{ task.name }} </option>
                console.log("🚀 ~ task:", task)
            </select>
        </div>
        <br>
        <div class="d-grid gap-2 col-4 mx-auto">
            <button @click="saveUser()" type="button" class="btn btn-primary">Submit</button>
            <button @click="deleteUser()" type="button" class="btn btn-danger">Delete</button>
        </div>

    </form>
</template>