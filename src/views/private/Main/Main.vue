<script setup>
import { RouterView, useRouter } from "vue-router";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import HeaderVue from "@/components/HeaderVue/HeaderVue.vue";
import Coins from "@/components/Coins/Coins.vue";
import { sidebarData } from "@/constants/sidebar.constant";
import { ref, watchEffect } from "vue";
import Container from "@/containers/Container.vue";

const router = useRouter();

const isMain = ref("main");

watchEffect(() => {
	isMain.value = router.currentRoute.value.name;
});
</script>

<template>
	<Container>
		<Sidebar :data="sidebarData" />
		<section class="content" v-if="isMain === 'main'">
			<HeaderVue
				title="Main"
				desc="Here you have an overview of all various coins and their information."
			/>
			<Coins />
		</section>
		<section class="content" v-else>
			<RouterView></RouterView>
		</section>
	</Container>
</template>

<style scoped></style>
