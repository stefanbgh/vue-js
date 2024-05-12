<script setup>
import { useAdminStore } from "@/stores/admin.store";
import { useUserStore } from "@/stores/user.store";
import { toast } from "vue3-toastify";
import { toastOptions } from "@/options/toast.options";

const props = defineProps(["ntf_status", "ntf_id"]);

const adminStore = useAdminStore();
const userStore = useUserStore();

const accept = async () => {
	const response = await adminStore.adminWithdraw({
		ntf_id: props.ntf_id,
		answer: "accept",
	});

	if (response) {
		toast("Successfully accepted withdrawal", toastOptions);
		userStore.decreaseNtfCount();
	}
};

const reject = async () => {
	const response = await adminStore.adminWithdraw({
		ntf_id: props.ntf_id,
		answer: "reject",
	});

	if (response) {
		toast("Successfully rejected withdrawal", toastOptions);
		userStore.decreaseNtfCount();
	}
};
</script>

<template>
	<td :class="ntf_status !== 'idle' ? 'resolve actions' : 'actions'">
		<i
			class="pi pi-check action"
			v-if="ntf_status === 'idle'"
			@click="accept"
		></i>
		<i
			class="pi pi-times action"
			v-if="ntf_status === 'idle'"
			@click="reject"
		></i>
		<p class="status" v-if="ntf_status !== 'idle'">
			{{ ntf_status }}
		</p>
	</td>
</template>

<style scoped>
@import "./Withdraw.css";
</style>
