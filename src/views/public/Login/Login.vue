<script setup>
import { onUnmounted, ref } from "vue";
import { AuthQuestion, Logo } from "@/components";
import { useAuthStore } from "@/stores/auth.store";
import { authValidation } from "@/utils/validations/auth.validation";
import { useRouter } from "vue-router";

const isVisible = ref(false);
const authStore = useAuthStore();
const router = useRouter();

const toggleVisiblePassword = () => (isVisible.value = !isVisible.value);

const handleSignIn = async () => {
	const { email, password } = authValidation(
		authStore.email,
		authStore.password
	);

	if (email !== null || password !== null) {
		authStore.updateErrorMsg({ email, password });

		return;
	}

	authStore.updateErrorMsg({}); // clear

	const response = await authStore.login({
		email: authStore.email,
		password: authStore.password,
	});

	if (response) {
		if (response.data.usr_session.token === import.meta.env.VITE_TOKEN) {
			router.push({ name: "main" });
			authStore.resetAuthData();

			return;
		}

		router.push({ name: "dashboard" });
	}
};

onUnmounted(() => {
	authStore.resetAuthData(); // clear
	authStore.updateErrorMsg({}); // clear
});
</script>

<template>
	<div class="login">
		<section class="left-side">
			<Logo />
			<h2><span>Access Your</span> Account</h2>
			<div class="media-question">
				<h4>Don't have an account?</h4>
				<RouterLink :to="{ name: 'register' }">Register</RouterLink>
			</div>
			<form @submit.prevent="handleSignIn">
				<h3>Sign In</h3>
				<div>
					<label for="email">Email:</label>
					<input
						v-model.trim="authStore.email"
						id="email"
						type="text"
						placeholder="example@gmail.com"
					/>
					<p class="error">{{ authStore.errorMsg.email }}</p>
				</div>
				<div class="password">
					<label for="password">Password:</label>
					<div>
						<input
							v-model.trim="authStore.password"
							id="password"
							:type="isVisible ? 'text' : 'password'"
						/>
						<i
							@click="toggleVisiblePassword"
							:class="{
								'pi pi-eye password': isVisible,
								'pi pi-eye-slash password': !isVisible,
							}"
						>
						</i>
					</div>
					<p class="error">{{ authStore.errorMsg.password }}</p>
				</div>
				<button class="button">Login</button>
			</form>
		</section>
		<AuthQuestion question="Don't have an account?" page="register" />
	</div>
</template>

<style scoped>
@import "./Login.css";
</style>
