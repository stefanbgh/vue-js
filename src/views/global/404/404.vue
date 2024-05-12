<script setup></script>

<template>
    <div class="not-found-container">
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
          <img src="../../../assets/crypto_assets/404.png" alt="404">
          <RouterLink class="btn-link btn" :to="{ name: 'home' }">Go Back</RouterLink>
    </div>
</template>

<style scoped>
@import url(404.css);
</style>
