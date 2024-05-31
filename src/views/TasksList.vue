<script setup>
import { onMounted, ref } from 'vue'
import TotalRecords from '../components/TotalRecords.vue';
let tasks = ref([])

async function loadTasks() {
  let json = await (
    await fetch(import.meta.env.VITE_API_URL + '/v1/task', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
  ).json()
  tasks.value = json.data
  console.log('🚀 ~ tasks:', tasks.value)
}

onMounted(async () => {
  await loadTasks()
})

</script>
<template>
  <div class="container">
    <total-records type="tasks" :total="tasks.length" @reload="loadTasks">
    </total-records>
    <div class="row">
      <div class="col">
        <table class="table table-primary">
          <thead>
            <tr class="table-danger">
              <th>Name</th>
              <th>Project</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in tasks" :key="task.id" class="table-primary">
              <td class="table-primary">{{ task.name }}</td>
              <td class="table-primary"> {{ task.project_id }}</td>
              <td class="table-primary">
                <button type="button" class="btn btn-light">
                  <RouterLink :to="'/tasks/edit/' + task.id">Edit</RouterLink>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

