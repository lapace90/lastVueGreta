<script setup>
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import FormSelect from '../components/FormSelect.vue';

let project = ref({
  name: '',
  dateStart: '',
  dateEnd: '',
  taskId: []
});
let tasks = ref([]);

const route = useRoute();
const router = useRouter();

let projectId = route.params.id ? parseInt(route.params.id, 10) : null;

async function loadTasks() {
  let json = await fetch(`${import.meta.env.VITE_API_URL}/v1/task`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json());

  tasks.value = json.data;
  console.log('🚀 ~ tasks:', tasks.value);
}

async function loadProject() {
  if (!projectId) {
    let date = new Date().toISOString().split('T')[0];
    project.value = { name: '', dateStart: date, dateEnd: date, taskId: [] };
    return;
  }

  let json = await fetch(`${import.meta.env.VITE_API_URL}/v1/project/${projectId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json());

  project.value = json.data;
  project.value.dateStart = project.value.dateStart.split('T')[0];
  project.value.dateEnd = project.value.dateEnd.split('T')[0];
}

async function saveProject() {
  console.log('Saving project:', project.value);
  console.log('Project tasks:', project.value.taskId);

  let method = projectId ? 'PUT' : 'POST';
  let url = projectId ? `${import.meta.env.VITE_API_URL}/v1/project/${projectId}` : `${import.meta.env.VITE_API_URL}/v1/project`;

  await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project.value)
  });

  router.push('/projects/list');
}


async function deleteProject() {
  if (projectId) {
    await fetch(`${import.meta.env.VITE_API_URL}/v1/project/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    router.push('/projects/list');
  }
}

onMounted(async () => {
  await loadProject();
  await loadTasks();
});
</script>

<template>
  <form @submit.prevent="saveProject">

    <div class="col-md-4 mx-auto">
      <label for="name" class="form-label">Name</label>
      <input type="text" class="form-control" id="name" v-model="project.name" required>
    </div>

    <div class="col-md-4 mx-auto">
      <label for="dateStart" class="form-label">Start</label>
      <input type="date" name="dateStart" class="form-control" id="dateStart" v-model="project.dateStart" required>
    </div>

    <div class="col-md-4 mx-auto">
      <label for="dateEnd" class="form-label">End</label>
      <input type="date" name="dateEnd" class="form-control" id="dateEnd" v-model="project.dateEnd" required>
    </div>

    <div class="col-md-4 mx-auto">
      <FormSelect v-model="project.taskId" label="Task" :options="tasks" itemKey="name" />
    </div>

    <br>

    <div class="d-grid gap-2 col-4 mx-auto">
      <button type="submit" class="btn btn-primary">Submit</button>
      <button v-if="projectId" @click="deleteProject" type="button" class="btn btn-danger">Delete</button>
    </div>

  </form>
</template>
