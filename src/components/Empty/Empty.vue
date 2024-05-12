<script setup>
defineProps(["name"]);
</script>

<template>
	<div class="empty">
		<h2>
			<span>{{ name }}</span> are empty!
		</h2>
		<RouterLink :to="{ name: 'main' }">Go to Main</RouterLink>
	</div>
</template>

<style scoped>
@import "./Empty.css";
</style>
