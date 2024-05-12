<script setup>
import { RouterView, useRouter } from "vue-router";
import AdminSidebar from "@/components/AdminSidebar/AdminSidebar.vue";
import AdminHeader from "@/components/AdminHeader/AdminHeader.vue";
import { adminSidebarData } from "@/constants/adminSidebar.constant";
import { onMounted, ref, watchEffect } from "vue";
import Container from "@/containers/Container.vue";
import { useAdminStore } from "@/stores/admin.store";
import Spinner from "@/components/Spinner/Spinner.vue";

const router = useRouter();
const adminStore = useAdminStore();

const isOverview = ref("dashboard");

watchEffect(() => {
	isOverview.value = router.currentRoute.value.name;
});

onMounted(() => {
	adminStore.getStatistics();
});
</script>

<template>
	<Container>
		<AdminSidebar :data="adminSidebarData" />
		<section class="content" v-if="isOverview === 'dashboard'">
			<AdminHeader
				title="Overview"
				desc="Here you can see all the stats about eCoinWall application."
			/>
			<div v-if="adminStore.statistics" class="cards">
				<div
					class="card"
					v-for="{ id, name, icon, count } in adminStore.statistics"
					:key="id"
				>
					<div>
						<h3>{{ name }}</h3>
						<i :class="icon"></i>
					</div>
					<p>{{ count }}</p>
				</div>
			</div>
			<Spinner v-else />
		</section>
		<section class="content" v-else>
			<RouterView></RouterView>
		</section>
	</Container>
</template>

<style scoped>
@import "./Dashboard.css";
</style>
