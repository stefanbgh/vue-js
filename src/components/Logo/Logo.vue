<script setup>
import logo from "@/assets/crypto_assets/logo.png";
</script>

<template>
	<RouterLink :to="{ name: 'home' }" class="logo">
		<img width="150" :src="logo" alt="logo" />
	</RouterLink>
</template>

<style scoped></style>
