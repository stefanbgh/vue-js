<script setup></script>

<template>
	<div class="session-expired">
		<div class="message">
			<h1><span>Session</span> expired!</h1>
			<h2>Please, login again</h2>
		</div>
		<RouterLink class="link" :to="{ name: 'login' }"
			>Go to Login</RouterLink
		>
	</div>
</template>

<style scoped>
@import "./SessionExpired.css";
</style>
