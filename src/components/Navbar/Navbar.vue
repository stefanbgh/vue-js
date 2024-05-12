<script setup>
import { useAuthStore } from "@/stores/auth.store";
import { ref, onMounted } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

//SID
const sid = localStorage.getItem("sid");
const router = useRouter();

// auth store
const authStore = useAuthStore();

// Logic for sticky nav bar
const isHeaderFixed = ref(false);
const btnText = ref("Open App");

onMounted(() => {
	window.addEventListener("scroll", handleScroll);
});

const handleScroll = () => {
	isHeaderFixed.value = window.scrollY > 0;
};

// Toggle menu visibility
const isMenuOpen = ref(false);

const toggleMenu = () => {
	isMenuOpen.value = !isMenuOpen.value;
};

// Logic for scrolling

const handleClick = () => {
	scrollToSections([
		"#home",
		"#about",
		"#choose-us",
		"#how-it-works",
		"#contact",
	]);

	toggleMenu();
};

const scrollToSections = (elementIds) => {
	elementIds.forEach((elementId) => {
		const element = document.querySelector(elementId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	});
};

const openApp = async () => {
	btnText.value = "Opening ...";

	const response = await authStore.checkSession(sid);

	isMenuOpen.value = !isMenuOpen.value;

	if (response.data.msg === "session-ok") {
		if (response.data.sessionUser.token !== import.meta.env.VITE_TOKEN) {
			router.push({ name: "dashboard" });

			return;
		}

		router.push({ name: "main" });
	}
};

onMounted(() => {
	const route = useRoute();

	// Check if there's a hash in the URL and scroll to the corresponding sections
	if (route.hash) {
		scrollToSections([route.hash]);
	}
});

//Logic for showing navbars
const route = useRoute();
const isHomePage = ref(route.name === "home");
</script>

<template>
	<header class="app-header" :class="{ fixed: isHeaderFixed }">
		<!-- Logo -->
		<img
			src="../../assets/crypto_assets/logo.png"
			alt="Logo"
			class="logo"
		/>

		<!-- Hamburger Button -->
		<button @click="toggleMenu" class="hamburger">
			<img src="../../assets/crypto_assets/hamburger.png" alt="menu" />
		</button>

		<div id="navbar-1" v-if="isHomePage">
			<div v-if="isMenuOpen" class="modal">
				<button @click="toggleMenu" class="close-button">
					&times;
				</button>
				<!-- Navigation links mobile-->
				<nav class="vertical-navigation">
					<a href="#home" @click="toggleMenu">Home</a>
					<a href="#about" @click="toggleMenu">About</a>
					<a href="#choose-us" @click="toggleMenu">Choose Us</a>
					<a href="#how-it-works" @click="toggleMenu">How It Works</a>
					<a href="#contact" @click="toggleMenu">Contact</a>

					<div v-if="sid">
						<a class="btn-link" @click="openApp">{{ btnText }}</a>
					</div>
					<div v-else>
						<RouterLink
							class="btn-link"
							:to="{ name: 'register' }"
							@click="toggleMenu"
							>Sign Up</RouterLink
						>
						<RouterLink
							class="btn-link"
							:to="{ name: 'login' }"
							@click="toggleMenu"
							>Sign In</RouterLink
						>
					</div>
				</nav>
			</div>
			<!-- Navigation links desktop -->
			<nav class="navigation" :class="{ active: isMenuOpen }">
				<a href="#home" @click="toggleMenu">Home</a>
				<a href="#about" @click="toggleMenu">About</a>
				<a href="#choose-us" @click="toggleMenu">Choose Us</a>
				<a href="#how-it-works" @click="toggleMenu">How It Works</a>
				<a href="#contact" @click="toggleMenu">Contact</a>
				<div v-if="sid">
					<a class="btn-link" @click="openApp">{{ btnText }}</a>
				</div>

				<div v-else>
					<RouterLink class="btn-link" :to="{ name: 'register' }"
						>Sign Up</RouterLink
					>
					<RouterLink class="btn-link" :to="{ name: 'login' }"
						>Sign In</RouterLink
					>
				</div>
			</nav>
		</div>

		<div id="navbar-2" v-else>
			<div v-if="isMenuOpen" class="modal">
				<button @click="toggleMenu" class="close-button">
					&times;
				</button>
				<!-- Navigation links mobile-->
				<nav class="vertical-navigation">
					<RouterLink
						:to="{ name: 'home', hash: '#home' }"
						@click="toggleMenu, handleClick"
						>Home</RouterLink
					>
					<RouterLink
						:to="{ name: 'home', hash: '#about' }"
						@click="toggleMenu, handleClick"
						>About</RouterLink
					>
					<RouterLink
						:to="{ name: 'home', hash: '#choose-us' }"
						@click="toggleMenu, handleClick"
						>Choose Us</RouterLink
					>
					<RouterLink
						:to="{ name: 'home', hash: '#how-it-works' }"
						@click="toggleMenu, handleClick"
						>How it works</RouterLink
					>
					<RouterLink
						:to="{ name: 'home', hash: '#contact' }"
						@click="toggleMenu, handleClick"
						>Contact</RouterLink
					>

					<div v-if="sid">
						<RouterLink
							class="btn-link"
							:to="{ name: 'main' }"
							@click="toggleMenu"
							>Open App</RouterLink
						>
					</div>
					<div v-else>
						<RouterLink
							class="btn-link"
							:to="{ name: 'register' }"
							@click="toggleMenu"
							>Sign Up</RouterLink
						>
						<RouterLink
							class="btn-link"
							:to="{ name: 'login' }"
							@click="toggleMenu"
							>Sign In</RouterLink
						>
					</div>
				</nav>
			</div>
			<!-- Navigation links desktop -->
			<nav class="navigation" :class="{ active: isMenuOpen }">
				<RouterLink
					:to="{ name: 'home', hash: '#home' }"
					@click="toggleMenu, handleClick"
					>Home</RouterLink
				>
				<RouterLink
					:to="{ name: 'home', hash: '#about' }"
					@click="toggleMenu, handleClick"
					>About</RouterLink
				>
				<RouterLink
					:to="{ name: 'home', hash: '#choose-us' }"
					@click="toggleMenu, handleClick"
					>Choose Us</RouterLink
				>
				<RouterLink
					:to="{ name: 'home', hash: '#how-it-works' }"
					@click="toggleMenu, handleClick"
					>How it works</RouterLink
				>
				<RouterLink
					:to="{ name: 'home', hash: '#contact' }"
					@click="toggleMenu, handleClick"
					>Contact</RouterLink
				>

				<div v-if="sid">
					<RouterLink class="btn-link" :to="{ name: 'main' }"
						>Open App</RouterLink
					>
				</div>
				<div v-else>
					<RouterLink class="btn-link" :to="{ name: 'register' }"
						>Sign Up</RouterLink
					>
					<RouterLink class="btn-link" :to="{ name: 'login' }"
						>Sign In</RouterLink
					>
				</div>
			</nav>
		</div>
	</header>
</template>

<style scoped>
@import url(Header.css);
</style>
