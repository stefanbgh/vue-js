<script setup>
import { onMounted, ref, watch } from "vue";
import { useAdminStore } from "@/stores/admin.store";
import AdminHeader from "@/components/AdminHeader/AdminHeader.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import Empty from "@/components/Empty/Empty.vue";
import Spinner from "@/components/Spinner/Spinner.vue";
import { sortByData } from "@/constants/sortByData.constant";

const selected = ref("latest");
const adminStore = useAdminStore();

watch(selected, (newVal) => {
	adminStore.notificationsSortBy(newVal);
});

onMounted(() => {
	adminStore.getNotifications();
});
</script>

<template>
	<AdminHeader
		title="Notifications"
		desc="There are all customers notifications in one place."
	/>
	<div v-if="adminStore.notifications">
		<div v-if="adminStore.notifications.length > 0">
			<section>
				<div class="sort">
					<p>Sort by:</p>
					<select v-model="selected">
						<option
							v-for="{ id, value, text } in sortByData"
							:value="value"
							:key="id"
						>
							{{ text }}
						</option>
					</select>
				</div>
			</section>
			<Pagination
				:data="adminStore.notifications"
				table="admin-notifications"
			/>
		</div>
		<Empty v-else name="Notifications" />
	</div>
	<Spinner v-else />
</template>

<style scoped>
@import "./AdminNotifications.css";
</style>
