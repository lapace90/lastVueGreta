import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectsList from '@/views/ProjectsList.vue'
import ProjectsForm from '@/views/ProjectsForm.vue'
import ProjectDetails from '@/views/ProjectDetails.vue'
import TasksList from '@/views/TasksList.vue'
import TasksEdit from '@/views/TasksEdit.vue'
import UsersList from '@/views/UsersList.vue'
import UsersEdit from '@/views/UsersEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/projects/list',
      name: 'projects',
      component: ProjectsList
    },
    { path: '/projects/details/:id', name: 'ProjectDetails', component: ProjectDetails },
    {
      path: '/projects/create',
      name: 'CreateProject',
      component: ProjectsForm
    },
    {
      path: '/projects/edit/:id',
      name: 'projectsEdit',
      component: ProjectsForm
    },
    {
      path: '/tasks/list',
      name: 'tasks',
      component: TasksList
    },
    {
      path: '/tasks/edit/:id',
      name: 'tasksEdit',
      component: TasksEdit
    },
    {
      path: '/users/list',
      name: 'users',
      component: UsersList
    },
    {
      path: '/users/edit/:id',
      name: 'usersEdit',
      component: UsersEdit
    }
  ]
})

export default router
