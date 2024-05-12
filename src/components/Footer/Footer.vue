<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const scrollToTop = (name) => {
	window.scrollTo({
		top: 0,
	});

	router.push({ name });
};
</script>

<template>
	<footer>
		<div class="footer-container">
			<img
				src="../../assets/crypto_assets/logo.png"
				alt="Logo"
				class="logo"
			/>

			<div>
				<h1>Social Links:</h1>
				<i class="pi pi-instagram" style="font-size: 2rem"></i>
				<i class="pi pi-linkedin" style="font-size: 2rem"></i>
			</div>

			<div>
				<h1>Contact:</h1>
				<a>ecoinwall.help@gmail.com</a>
			</div>

			<div>
				<h1>In case you need a help:</h1>
				<a @click="scrollToTop('faq')">FAQ</a>
				<a @click="scrollToTop('instructions')">Legal</a>
			</div>
		</div>

		<p>©2024 eCoinWall. All rights reserved.</p>
	</footer>
</template>

<style scoped>
@import url(Footer.css);
</style>
