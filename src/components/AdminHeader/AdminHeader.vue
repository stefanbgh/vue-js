<script setup>
import { RouterLink } from "vue-router";
import logo from "@/assets/crypto_assets/logo.png";
import { useUserStore } from "@/stores/user.store";

defineProps(["title", "desc"]);

const userStore = useUserStore();
</script>

<template>
	<header>
		<div class="logo">
			<RouterLink :to="{ name: 'home' }"
				><img width="150" :src="logo" alt="logo"
			/></RouterLink>
		</div>
		<RouterLink class="notifications" :to="{ name: 'admin-notifications' }">
			<i class="pi pi-bell"></i>
			<div v-if="userStore.ntfCount" class="count">
				{{ userStore.ntfCount }}
			</div>
		</RouterLink>
	</header>
	<div class="page-desc">
		<h2>{{ title }}</h2>
		<p>
			{{ desc }}
		</p>
	</div>
</template>

<style scoped>
@import "./AdminHeader.css";
</style>
