<script setup>
defineProps(["data"]);
</script>

<template>
	<table>
		<thead>
			<tr>
				<th>User ID</th>
				<th>Type</th>
				<th>Content</th>
				<th>Date</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="{
					txn_id,
					usr_id,
					txn_type,
					txn_content,
					txn_timestamp,
				} in data"
				:key="txn_id"
			>
				<td>{{ usr_id }}</td>
				<td class="type">{{ txn_type }}</td>
				<td>{{ txn_content }}</td>
				<td>{{ txn_timestamp }}</td>
			</tr>
		</tbody>
	</table>
</template>

<style scoped>
@import "./AdminTransactionsTable.css";
</style>
