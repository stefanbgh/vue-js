<script setup>
import { onMounted, ref, watch } from "vue";
import { useAdminStore } from "@/stores/admin.store";
import AdminHeader from "@/components/AdminHeader/AdminHeader.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import Empty from "@/components/Empty/Empty.vue";
import Spinner from "@/components/Spinner/Spinner.vue";
import { sortByData } from "@/constants/sortByData.constant";

const adminStore = useAdminStore();
const selected = ref("latest");

watch(selected, (newVal) => {
	adminStore.transactionsSortBy(newVal);
});

onMounted(() => {
	adminStore.getTransactions();
});
</script>

<template>
	<AdminHeader
		title="Transactions"
		desc="Here you have an overview of all users transactions."
	/>
	<div v-if="adminStore.transactions">
		<div v-if="adminStore.transactions.length > 0">
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
				:data="adminStore.transactions"
				table="admin-transactions"
			/>
		</div>
		<Empty v-else name="Transactions" />
	</div>
	<Spinner v-else />
</template>

<style scoped>
@import "./AdminTransactions.css";
</style>
