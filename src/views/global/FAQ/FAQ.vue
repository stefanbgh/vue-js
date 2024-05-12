<script setup>
import { ref } from 'vue';
import Nav from '@/components/Navbar/Navbar.vue'
import Footer from '@/components/Footer/Footer.vue'

//Logic for FAQ
const faqList = ref([
  { id: 1, question: 'What is eCoinWall card?', answer: "The eCoinWall card is our virtual solution to help you store money(an alternative wallet, but in our original way).With the eCoinWall card and our ATM system, you can deposit and withdraw dollars.", expanded: false },
  { id: 2, question: 'How to use ATM?', answer: "Usage of an ATM in our system is similar to a real-life ATM. On your right side, there is a screen or, if you're using a phone, it is located below the numbers.You have numbers that give you one more opportunity to enter the amount for a custom money deposit or withdrawal.", expanded: false },
  { id: 3, question: 'How transaction system works?', answer: "With our transaction system, you can send money to other users and sell your coins to obtain dollars.", expanded: false },
  { id: 4, question: 'Why withdrawals need to be approved?', answer: "Our wallet system is one of the most certified wallets on the web3. When withdrawing money, our company is taking a risk and assuming all responsibilities, not the user.", expanded: false },
]);

const toggleAccordion = (index) => {
  faqList.value[index].expanded = !faqList.value[index].expanded;
};

</script>

<template>
	<!--Header-->
    <Nav></Nav>
	 
	<section class="faq">
		<div>
		<h2>Frequently Asked Questions</h2>
		<div class="accordion">
		<div v-for="(item, index) in faqList" :key="index" class="accordion-item">
			<button :id="'accordion-button-' + item.id" :aria-expanded="item.expanded.toString()" @click="toggleAccordion(index)">
			<span class="accordion-title">{{ item.question }}</span>
			<span class="icon" aria-hidden="true"></span>
			</button>
			<div v-show="item.expanded" class="accordion-content">
			<p>{{ item.answer }}</p>
			</div>
		</div>
		</div>
  </div>
	</section>

	<!--Footer-->
	<Footer></Footer>
    
</template>

<style scoped>
  @import url(FAQ.css);
</style>

