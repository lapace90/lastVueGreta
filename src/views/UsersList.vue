<script setup>
import { onMounted, ref } from 'vue'
import TotalRecords from '../components/TotalRecords.vue';

let users = ref([])

async function loadUsers() {
  let json = await (
    await fetch(import.meta.env.VITE_API_URL + '/v1/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
  ).json()
  users.value = json.data
  console.log('🚀 ~ users:', users.value)
}

onMounted(async () => {
  await loadUsers()
})


</script>
<template>

  <div class="container">
    <total-records type="users" :total="users.length" @reload="loadUsers">
    </total-records>

    <div class="row">
      <div class="col">
        <table class="table table-primary">
          <thead>
            <tr class="table-danger">
              <th>Name</th>
              <th>Task</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="table-primary">
              <td class="table-primary">{{ user.name }}</td>
              <td class="table-primary"> {{ user.task }}</td>
              <td class="table-primary">
                <button type="button" class="btn btn-light">
                  <RouterLink :to="'/users/edit/' + user.id">Edit</RouterLink>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

