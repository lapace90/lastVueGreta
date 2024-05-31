<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>

    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">PinkKiwi</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
            <RouterLink class="nav-link" to="/projects/list">Projects</RouterLink>
            <RouterLink class="nav-link" to="/tasks/list">Tasks</RouterLink>
            <RouterLink class="nav-link" to="/users/list">Users</RouterLink>

          </div>
        </div>
      </div>
    </nav>
  </header>

  <RouterView />
</template>
