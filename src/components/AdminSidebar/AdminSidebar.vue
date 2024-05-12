<script setup>
import { useUserStore } from "@/stores/user.store";
import { onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";

defineProps(["data"]);

const router = useRouter();
const usr_id = localStorage.getItem("usr_id");

const userStore = useUserStore();

const handleLogout = () => {
	localStorage.removeItem("sid");
	localStorage.removeItem("usr_id");

	userStore.resetProfileInfo();

	router.push({ name: "login" });
};

onMounted(() => {
	if (usr_id) {
		userStore.getProfileInfo(usr_id);
	}
});
</script>

<template>
	<aside class="admin-sidebar">
		<div class="profile">
			<div class="image" v-if="userStore.image">
				<img
					:src="`data:image/*;base64,${userStore.image}`"
					alt="profile.jpg"
				/>
			</div>
			<div class="image" v-else>
				<i class="pi pi-camera"></i>
			</div>
			<div v-if="userStore.user">
				<p>Admin</p>
				<div>@{{ userStore.user.usr_username }}</div>
			</div>
			<div v-else>Loading...</div>
		</div>
		<div class="navigation">
			<RouterLink
				v-for="{ id, name, icon, text } in data"
				:to="{ name }"
				:key="id"
			>
				<i :class="icon"></i>
				<p>{{ text }}</p>
			</RouterLink>
		</div>
		<div class="logout">
			<button @click="handleLogout">
				<i class="pi pi-sign-out"></i>
				<p>Logout</p>
			</button>
		</div>
	</aside>
</template>

<style scoped>
@import "./AdminSidebar.css";
</style>
