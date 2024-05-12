<script setup>
import HeaderVue from "@/components/HeaderVue/HeaderVue.vue";
import Form from '@/components/Form/Form.vue'

</script>

<template>
	<HeaderVue
		title="Support"
		desc="Have some questions? We are here to help."
	/>
		
	<div class="container-support">
       <Form></Form>
	</div>
</template>

<style scoped>
@import url(Support.css);
</style>
