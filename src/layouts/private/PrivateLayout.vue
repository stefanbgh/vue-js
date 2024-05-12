<script setup>
import { RouterView } from "vue-router";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import Loader from "@/components/Loader/Loader.vue";

const sid = localStorage.getItem("sid");
const authStore = useAuthStore();
const router = useRouter();
const access = ref(false);

onMounted(async () => {
	if (sid) {
		const response = await authStore.checkSession(sid);

		if (response.data.msg === "session-not-valid") {
			router.push({ name: "login" });
		}

		if (response.data.msg === "session-ok") {
			if (
				response.data.sessionUser.token !== import.meta.env.VITE_TOKEN
			) {
				access.value = true;
				router.push({ name: "dashboard" });

				return;
			}

			access.value = true;
		}
	} else {
		router.push({ name: "login" });
	}
});
</script>

<template>
	<div v-if="access">
		<RouterView></RouterView>
	</div>
	<Loader v-else/>
</template>

<style scoped></style>
