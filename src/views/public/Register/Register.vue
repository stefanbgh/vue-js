<script setup>
import { ref, onUnmounted } from "vue";
import { AuthQuestion, Logo } from "@/components";
import { useAuthStore } from "@/stores/auth.store";
import { registerValidation } from "@/utils/validations/register.validation";
import { cardValidation } from "@/utils/validations/card.validation";
import { useRouter } from "vue-router";
import { faker } from "@faker-js/faker";
import { toast } from "vue3-toastify";
import { toastOptions } from "@/options/toast.options";

const router = useRouter();
const authStore = useAuthStore();

const isVisible = ref(false);
const checkbox = ref(false);
const success = ref(false);

const toggleVisiblePassword = () => (isVisible.value = !isVisible.value);

const handleStep1 = async () => {
	if (!checkbox.value) {
		toast("You must confirm consent", toastOptions);

		return;
	}

	const { username, email, password } = registerValidation(
		authStore.username,
		authStore.email,
		authStore.password
	);

	if (username === null && email === null && password === null) {
		// check username and email
		const response = await authStore.checkStepOne();

		if (response) {
			authStore.step = 2;
		}

		authStore.updateErrorMsg({}); // clear
		return;
	}

	authStore.updateErrorMsg({ username, email, password });
};

const handleStep2 = (skip) => {
	if (skip) {
		authStore.step = 3;
		return;
	}

	const { crd_fullname, crd_pin } = cardValidation({
		crd_fullname: authStore.fullname,
		crd_pin: authStore.pin,
	});

	if (crd_fullname === null && crd_pin === null) {
		authStore.step = 3;

		authStore.updateErrorMsg({}); // clear
		return;
	}

	authStore.updateErrorMsg({ fullname: crd_fullname, pin: crd_pin });
};

const handleStep3 = async (action) => {
	if (action === "cancel") {
		router.push({ name: "home" });

		authStore.resetAuthData();

		return;
	}

	let card = null;

	if (authStore.pin && authStore.fullname) {
		card = {
			crd_fullname: authStore.fullname,
			crd_pin: authStore.pin,
			crd_number: faker.finance.creditCardNumber("####-####-####-####"),
			crd_cvv: faker.finance.creditCardCVV(),
		};
	}

	const response = await authStore.register({
		username: authStore.username,
		email: authStore.email,
		password: authStore.password,
		card,
	});

	authStore.resetAuthData();

	if (!response) {
		checkbox.value = false;
		isVisible.value = false;
		router.push({ name: "register" });

		return;
	}

	success.value = true;
	router.push({ name: "login" });
};

onUnmounted(() => {
	authStore.resetAuthData(); // clear
	authStore.updateErrorMsg({}); // clear

	if (success.value) {
		toast("Register successful", toastOptions);
	}
});
</script>

<template>
	<div class="register">
		<section class="left-side">
			<Logo />
			<h2>
				Registration <span>Step {{ authStore.step }}</span>
			</h2>
			<div class="media-question">
				<h4>Already have an account?</h4>
				<RouterLink :to="{ name: 'login' }">Login</RouterLink>
			</div>
			<form @submit.prevent="handleStep1" v-if="authStore.step === 1">
				<h3>Sign Up</h3>
				<div>
					<label for="username">Username:</label>
					<input
						v-model.trim="authStore.username"
						id="username"
						type="text"
						placeholder="example123"
					/>
					<p class="error">{{ authStore.errorMsg.username }}</p>
				</div>
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
				<div class="legal">
					<label for="check" class="check">
						<input v-model="checkbox" id="check" type="checkbox" />
						<p>
							By signing up I agree that I'm 18 years of age or
							older, to <br />
							the
							<RouterLink :to="{ name: 'instructions' }"
								>Terms of use, Privacy Policy</RouterLink
							>
						</p>
					</label>
				</div>
				<button class="button">Next Step</button>
			</form>
			<form
				@submit.prevent="handleStep2(false)"
				v-else-if="authStore.step === 2"
			>
				<h3>Make eCoinWall card</h3>
				<div>
					<label for="fullname">Full Name:</label>
					<input
						v-model.trim="authStore.fullname"
						id="fullname"
						type="text"
						placeholder="John Doe"
					/>
					<p class="error">{{ authStore.errorMsg.fullname }}</p>
				</div>
				<div class="pin">
					<label for="pin">Pin:</label>
					<div>
						<input
							v-model.trim="authStore.pin"
							id="pin"
							:type="isVisible ? 'text' : 'password'"
							placeholder="4-digit number"
							maxlength="4"
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
					<p class="error">{{ authStore.errorMsg.pin }}</p>
				</div>
				<div class="buttons">
					<button type="submit" class="button">Make a card</button>
					<button type="button" @click="handleStep2(true)">
						Skip for now
					</button>
				</div>
			</form>
			<form class="step3" v-else>
				<h3>Do you want to complete your registration?</h3>
				<div class="buttons">
					<button type="button" @click="handleStep3('cancel')">
						Cancel
					</button>
					<button
						type="button"
						@click="handleStep3('yes')"
						class="button"
					>
						Yes
					</button>
				</div>
			</form>
		</section>
		<AuthQuestion question="Already have an account?" page="login" />
	</div>
</template>

<style scoped>
@import "./Register.css";
</style>
