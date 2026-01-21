<script setup></script>

<template>
  <header>
    <nav aria-label="Main navigation">
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/favorites">Favorites</RouterLink>
    </nav>
  </header>
  <main id="main-content">
    <RouterView />
  </main>
</template>

<style scoped></style>
