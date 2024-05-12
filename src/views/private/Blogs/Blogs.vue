<script setup>
import HeaderVue from "@/components/HeaderVue/HeaderVue.vue";
</script>

<template>
	<HeaderVue title="Blogs" desc="..." />
	<div>
		<h1><span>Coming</span> Soon!</h1>
		<RouterLink :to="{ name: 'main' }">Go to Main</RouterLink>
	</div>
</template>

<style scoped>
@import "./Blogs.css";
</style>
