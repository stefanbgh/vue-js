<script setup>
import { useAdminStore } from "@/stores/admin.store";
import { useUserStore } from "@/stores/user.store";
import { toast } from "vue3-toastify";
import { toastOptions } from "@/options/toast.options";

const props = defineProps(["ntf_status", "ntf_id", "usr_id"]);

const adminStore = useAdminStore();
const userStore = useUserStore();

const recovery = async () => {
	const response = await adminStore.adminRecoveryCard({
		ntf_id: props.ntf_id,
		usr_id: props.usr_id,
	});

	if (response) {
		toast("The user's card has been successfully recovered", toastOptions);
		userStore.decreaseNtfCount();
	}
};
</script>

<template>
	<td :class="ntf_status !== 'idle' ? 'resolve actions' : 'actions'">
		<i
			class="pi pi-check action"
			v-if="ntf_status === 'idle'"
			@click="recovery"
		></i>
		<p class="status" v-if="ntf_status !== 'idle'">
			{{ ntf_status }}
		</p>
	</td>
</template>

<style scoped>
@import "./RecoveryCard.css";
</style>
