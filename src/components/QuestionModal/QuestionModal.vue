<script setup>
defineProps(["question"]);
const emits = defineEmits(["close-modal", "delete-data"]);

const closeModal = () => {
	emits("close-modal");
};

const handleDelete = () => {
	emits("delete-data");
};
</script>

<template>
	<div class="modal">
		<div class="question">
			<div class="info">
				<h2>{{ question }}</h2>
			</div>
			<div class="buttons">
				<button @click="closeModal">No</button>
				<button @click="handleDelete" class="button">Yes</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
@import "./QuestionModal.css";
</style>
