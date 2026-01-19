<script setup></script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink> | <RouterLink to="/favorites">Favorites</RouterLink> |
    <RouterLink to="/pokemon/">Pokemon Detail</RouterLink>
  </nav>

  <RouterView />
</template>

<style scoped></style>
