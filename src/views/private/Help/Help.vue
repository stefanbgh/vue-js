<script setup>
import HeaderVue from "@/components/HeaderVue/HeaderVue.vue";

const items = [
	{title: 'FAQ', description: 'There you can see all frequently asked questions our customers are asking', route: 'faq'}, 
	{title: 'Legal', description: 'There you can see all about our Terms of Use, and Privacy Policy', route: 'instructions'}
];
</script>

<template>
	<HeaderVue title="Help" desc="If you need any help, you have you all answers of various topics."/>

	<div class = "help-content" v-for="(item, index) in items" :key="index">
		<h1>{{ item.title }}</h1>
		<p>{{ item.description }}</p>
		<RouterLink :to="{ name: `${item.route}` }"><i class="pi pi-arrow-down-right" style="font-size: 1rem"></i>See more</RouterLink>
	</div>

</template>

<style scoped>
 @import url('Help.css');
</style>
