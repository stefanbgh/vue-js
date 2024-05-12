<script setup>
import { ref, computed, defineProps } from "vue";
import {
	TransactionsTable,
	NotificationsTable,
	EmployeesCards,
	CustomersCards,
	AdminTransactionsTable,
	AdminNotificationsTable,
} from "@/components";

const props = defineProps(["data", "table"]);
const currentPage = ref(1);
const maxVisiblePages = 6;

const paginatedData = computed(() => {
	const start = (currentPage.value - 1) * 6;
	const end = start + 6;

	return props.data.slice(start, end);
});

const pageCount = computed(() => Math.ceil(props.data.length / 6));

const displayedPages = computed(() => {
	const startPage = Math.max(
		1,
		currentPage.value - Math.floor(maxVisiblePages / 2)
	);

	const endPage = Math.min(pageCount.value, startPage + maxVisiblePages - 1);

	return Array.from(
		{ length: endPage - startPage + 1 },
		(_, index) => startPage + index
	);
});

const prevPage = () => currentPage.value--;
const nextPage = () => currentPage.value++;
const setPage = (page) => (currentPage.value = page);
const firstPage = () => (currentPage.value = 1);
const lastPage = () => (currentPage.value = pageCount.value);
</script>

<template>
	<NotificationsTable
		:data="paginatedData"
		v-if="table === 'notifications'"
	/>
	<AdminNotificationsTable
		:data="paginatedData"
		v-if="table === 'admin-notifications'"
	/>
	<TransactionsTable :data="paginatedData" v-if="table === 'transactions'" />
	<AdminTransactionsTable
		:data="paginatedData"
		v-if="table === 'admin-transactions'"
	/>
	<EmployeesCards :data="paginatedData" v-if="table === 'employees'" />
	<CustomersCards :data="paginatedData" v-if="table === 'customers'" />
	<div class="pagination">
		<button class="prev" @click="firstPage" :disabled="currentPage === 1">
			First
		</button>
		<button class="prev" @click="prevPage" :disabled="currentPage === 1">
			Prev
		</button>
		<button
			v-for="page in displayedPages"
			:key="page"
			@click="setPage(page)"
			:class="{ active: currentPage === page, page: true }"
		>
			{{ page }}
		</button>
		<button
			class="next"
			@click="nextPage"
			:disabled="currentPage === pageCount"
		>
			Next
		</button>
		<button
			class="next"
			@click="lastPage"
			:disabled="currentPage === data.length - 1"
		>
			Last
		</button>
	</div>
</template>

<style scoped>
@import "./Pagination.css";
</style>
