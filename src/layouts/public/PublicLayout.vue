<script setup>
import { useAuthStore } from "@/stores/auth.store";
import { onMounted, ref } from "vue";
import { RouterView, useRouter } from "vue-router";
import Loader from "@/components/Loader/Loader.vue";

const sid = localStorage.getItem("sid");
const authStore = useAuthStore();
const router = useRouter();
const access = ref(false);

onMounted(async () => {
	if (sid) {
		const response = await authStore.checkSession(sid);

		if (response.data.msg === "session-not-valid") {
			access.value = true;
			router.push({ name: "login" });
		}

		if (response.data.msg === "session-ok") {
			if (
				response.data.sessionUser.token === import.meta.env.VITE_TOKEN
			) {
				access.value = true;
				router.push({ name: "main" });

				return;
			}

			access.value = true;
			router.push({ name: "dashboard" });
		}

		return;
	}

	access.value = true;
});
</script>

<template>
	<div v-if="access">
		<RouterView></RouterView>
	</div>
	<Loader v-else/>
</template>

<style scoped></style>
