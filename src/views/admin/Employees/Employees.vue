<script setup>
import { onMounted, ref, watchEffect } from "vue";
import AdminHeader from "@/components/AdminHeader/AdminHeader.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import { debounce } from "@/utils/debounce";
import { useAdminStore } from "@/stores/admin.store";
import Spinner from "@/components/Spinner/Spinner.vue";

const adminStore = useAdminStore();
const data = ref(null);

const searchRef = ref("");

const search = debounce(() => {
	if (searchRef.value === "") {
		data.value = adminStore.employees;
		return;
	}

	data.value = adminStore.employees.filter((item) =>
		item.usr_username.toLowerCase().includes(searchRef.value.toLowerCase())
	);
});

watchEffect(() => {
	data.value = adminStore.employees;
});

onMounted(() => {
	adminStore.getEmployees();
});
</script>

<template>
	<AdminHeader
		title="Employees"
		desc="List of all employees in eCoinWall company."
	/>
	<section>
		<div class="search">
			<i class="pi pi-search"></i>
			<input
				type="text"
				placeholder="Search by username"
				v-model="searchRef"
				@input="search"
			/>
		</div>
	</section>
	<div v-if="data">
		<Pagination v-if="data.length > 0" :data="data" table="employees" />
		<h2 v-else>Sorry, <span>employee</span> not found!</h2>
	</div>
	<Spinner v-else />
</template>

<style scoped>
@import "./Employees.css";
</style>
