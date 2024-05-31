<script setup>
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
let task = ref({});


const route = useRoute();
const router = useRouter();

let taskId = route.params.id * 1;

async function loadTask() {


    let json = await (
        await fetch(import.meta.env.VITE_API_URL + '/v1/task/' + taskId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
    ).json();

    if (!taskId) {
        task.value = { name: '', taskId: 0 };
        return;
    }
    task.value = json.data
    console.log('🚀 ~ task:', task.value)
}

async function saveTask() {
    let method = taskId ? 'PUT' : 'POST';
    let url = taskId ? `${import.meta.env.VITE_API_URL}/v1/task/${taskId}` : `${import.meta.env.VITE_API_URL}/v1/tasks`;
    await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task.value)
    });
    router.push('/task/list');
}


onMounted(async () => {
    await loadTask()
})

async function deleteTask() {
    await (
        fetch(import.meta.env.VITE_API_URL + '/v1/task/:id', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
    ).json();
    router.push('/tasks/list');
}

</script>

<template>
    <form method="post">

        <div class="col-md-4 mx-auto">
            <label for="name" class="form-label">Name</label>
            <input type="name" class="form-control" id="name" v-model="task.name">
        </div>



        <br>
        <div class="d-grid gap-2 col-4 mx-auto">
            <button @click="saveTask()" type="button" class="btn btn-primary">Submit</button>
            <button @click="deleteTask()" class="btn btn-danger">Delete</button>
        </div>

    </form>
</template>
