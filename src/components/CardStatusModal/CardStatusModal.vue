<script setup>
defineProps(["status"]);
const emits = defineEmits(["close-modal"]);

const closeModal = () => {
	emits("close-modal");
};
</script>

<template>
	<div class="modal">
		<div class="status">
			<div class="info">
				<h2>Your card is {{ status }}.</h2>
				<h3>
					If you want to activate it, you can go to the "Profile"
					section.
				</h3>
			</div>
			<div class="buttons">
				<button @click="closeModal">Close</button>
				<RouterLink class="link" :to="{ name: 'profile' }"
					>Go to Profile</RouterLink
				>
			</div>
		</div>
	</div>
</template>

<style scoped>
@import "./CardStatusModal.css";
</style>
