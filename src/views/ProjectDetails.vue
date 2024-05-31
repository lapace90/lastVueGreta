<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import FormSelect from '../components/FormSelect.vue';


const route = useRoute();
const projectId = parseInt(route.params.id, 10);
const project = ref({
    name: '',
    dateStart: '',
    dateEnd: '',
    tasks: [],
});
const newTask = ref('');

async function loadProjectDetails() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/project/${projectId}`);
        const data = await response.json();
        project.value = data.data;
    } catch (error) {
        console.error('Error loading project details:', error);
    }
}

async function addTask() {
    if (!newTask.value.trim()) return;
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newTask.value, projectId, status: 'incomplete' }),
        });
        const data = await response.json();
        project.value.tasks.push(data.data);
        newTask.value = ''; // Clear the input field after adding the task
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

async function removeTask(taskId) {
    try {
        await fetch(`${import.meta.env.VITE_API_URL}/v1/task/${taskId}`, {
            method: 'DELETE',
        });
        project.value.tasks = project.value.tasks.filter(task => task.id !== taskId);
    } catch (error) {
        console.error('Error removing task:', error);
    }
}

onMounted(async () => {
    await loadProjectDetails();
});
</script>

<template>
    <div class="container">
        <h1 class="my-4">Project Details</h1>
        <div class="card">
            <div class="card-body">
                <div v-if="project.name">
                    <h3 class="card-title mb-3">Project Name: {{ project.name }}</h3>
                    <p class="card-text mb-1">Start : {{ project.dateStart.split('T')[0] }}</p>
                    <p class="card-text mb-3">End : {{ project.dateEnd.split('T')[0] }}</p>
                    <div v-if="project.tasks.length > 0">
                        <h3 class="card-title mb-3">Project Tasks</h3>
                        <ul class="list-group">
                            <li v-for="task in project.tasks" :key="task.id" class="list-group-item">
                                <span class="fw-bold">{{ task.name }}</span> -
                                <span :class="task.status === 'completed' ? 'text-success' : 'text-danger'">
                                    {{ task.status === 'completed' ? 'Completed' : 'Incomplete' }}
                                </span>
                                <button @click="removeTask(task.id)" class="btn btn-sm btn-danger ms-2">Remove</button>
                            </li>
                        </ul>
                    </div>
                    <div v-else>
                        <p class="card-text">No tasks associated with this project.</p>
                    </div>
                    <form @submit.prevent="addTask">
                        <div class="mb-3">
                            <label for="existingTasks" class="form-label">Tasks:</label>
                            <div class="col-md-4 mx-auto">
                                <FormSelect v-model="project.taskId" label="Task" :options="tasks" itemKey="name" />
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Add Task</button>
                    </form>
                </div>
                <div v-else>
                    <p>Loading...</p>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped>
.card {
    margin-top: 20px;
}

.card-text {
    font-size: 16px;
}

.list-group-item {
    font-size: 14px;
    padding: 8px 16px;
}
</style>