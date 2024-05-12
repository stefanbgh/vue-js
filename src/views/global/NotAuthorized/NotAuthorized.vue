<script setup></script>

<template>
	<div class="not-authorized-container">
      <h1>401 - You are not authorized</h1>
      <p>You tried to access a page you did not have prior authorization for.</p>
          <img src="../../../assets/crypto_assets/not-authorized.png" alt="401">
          <RouterLink class="btn-link btn" :to="{ name: 'main' }">Go Back</RouterLink>
    </div>
</template>

<style scoped>
@import url(NotAuthorized.css);
</style>
