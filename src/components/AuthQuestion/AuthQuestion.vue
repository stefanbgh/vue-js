<script setup>
import register from "@/assets/crypto_assets/auth/login.webp";

defineProps(["question", "page"]);
</script>

<template>
	<section class="right-side">
		<div class="question">
			<h4>{{ question }}</h4>
			<RouterLink :to="{ name: page }">{{ page }}</RouterLink>
		</div>
		<img width="400" :src="register" alt="register" />
	</section>
</template>

<style scoped>
@import "./AuthQuestion.css";
</style>
