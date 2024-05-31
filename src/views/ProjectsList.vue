<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

let projects = ref([])
const router = useRouter()

async function loadProjects() {
  let json = await (
    await fetch(import.meta.env.VITE_API_URL + '/v1/project', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

  ).json()

  projects.value = json.data

}

function createNewProject() {
  router.push('/projects/create')
}

onMounted(async () => {
  await loadProjects()
})
</script>

<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1>Projects ({{ projects.length }})</h1>
      <button @click="createNewProject" class="btn btn-primary">Crea Nuovo Progetto</button>
    </div>
    <div class="row">
      <div class="col">
        <table class="table table-primary">
          <thead>
            <tr class="table-danger">
              <th>Name</th>
              <th>Start</th>
              <th>End</th>
              <th>Tasks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects" :key="project.id" class="table-primary">
              <td class="table-primary"><RouterLink :to="'/projects/details/' + project.id">{{ project.name }}</RouterLink></td>
              <td class="table-primary">{{ project.dateStart.split('T')[0] }}</td>
              <td class="table-primary">{{ project.dateEnd.split('T')[0] }}</td>
              <td class="table-primary">{{ project.tasks.length }}</td>
              <td class="table-primary">
                <button type="button" class="btn btn-light">
                  <RouterLink :to="'/projects/edit/' + project.id">Edit</RouterLink>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
