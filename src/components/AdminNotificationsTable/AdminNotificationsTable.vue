<script setup>
import { useAdminStore } from "@/stores/admin.store";
import { timeAgo } from "@/utils/helpers/timeAgo";
import Withdraw from "@/components/Withdraw/Withdraw.vue";
import RenewalCard from "@/components/RenewalCard/RenewalCard.vue";
import RecoveryCard from "@/components/RecoveryCard/RecoveryCard.vue";

defineProps(["data"]);

const adminStore = useAdminStore();
</script>

<template>
	<table>
		<thead>
			<tr>
				<th>Type</th>
				<th>Content</th>
				<th>Date</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="{
					ntf_id,
					ntf_type,
					ntf_content,
					ntf_status,
					ntf_timestamp,
					usr_id,
				} in data"
				:key="ntf_id"
			>
				<td :class="ntf_status !== 'idle' ? 'resolve type' : 'type'">
					{{ ntf_type }}
				</td>
				<td :class="ntf_status !== 'idle' && 'resolve'">
					{{ ntf_content }}
				</td>
				<td :class="ntf_status !== 'idle' && 'resolve'">
					{{ timeAgo(ntf_timestamp) }}
				</td>
				<Withdraw
					v-if="ntf_type === 'withdraw'"
					:ntf_status="ntf_status"
					:ntf_id="ntf_id"
				/>
				<RenewalCard
					v-if="ntf_type === 'renewal'"
					:ntf_status="ntf_status"
					:ntf_id="ntf_id"
					:usr_id="usr_id"
				/>
				<RecoveryCard
					v-if="ntf_type === 'recovery'"
					:ntf_status="ntf_status"
					:ntf_id="ntf_id"
					:usr_id="usr_id"
				/>
			</tr>
		</tbody>
	</table>
</template>

<style scoped>
@import "./AdminNotificationsTable.css";
</style>
