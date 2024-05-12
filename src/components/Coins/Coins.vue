<script setup>
import axios from "axios";
import { ref, onMounted, onUnmounted } from "vue";
import { url, params, headers } from "@/options/coins.options";
import CoinCard from "@/components/CoinCard/CoinCard.vue";

let interval;
const cryptos = ref([]);

const getCoins = async () => {
	try {
		const response = await axios.post(url, params, { headers });

		cryptos.value = response.data;
	} catch (error) {
		// toastify
		throw new Error(error);
	}
};

onMounted(() => {
	getCoins();

	interval = setInterval(() => {
		getCoins();
	}, 5000);
});

onUnmounted(() => {
	clearInterval(interval);
});
</script>

<template>
	<div v-if="cryptos.length > 0">
		<CoinCard :cryptos="cryptos" />
	</div>
	<h3 class="loader" v-else>Please be patient ...</h3>
</template>

<style scoped>
@import "./Coins.css";
</style>
