<script setup>
import { RouterLink } from 'vue-router';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

//Import Images
import wallet from '@/assets/crypto_assets/landing_page/wallet.webp';
import transactions from '@/assets/crypto_assets/landing_page/transactions.webp';
import volumes from '@/assets/crypto_assets/landing_page/volumes.webp';
import support from '@/assets/crypto_assets/landing_page/support.webp';
import register from '@/assets/crypto_assets/landing_page/register.webp';
import trading from '@/assets/crypto_assets/landing_page/trading.webp';
import card from '@/assets/crypto_assets/landing_page/credit-card.webp';
import money from '@/assets/crypto_assets/landing_page/money.webp';

//Import Components
import Nav from '@/components/Navbar/Navbar.vue'
import Footer from '@/components/Footer/Footer.vue'
import Form from '@/components/Form/Form.vue'

//Constants
const items = [
	{ 
	 id: 1,
	 title: 'Dollar bitcoin exchange',
	 description: 'Use your credit card to deposit dollars and earn coins',
	 icon: 'pi pi-dollar'
    },
	{ 
	 id: 2,
	 title: 'Unique card system',
	 description: 'We are giving you eCoinWall card that is connected with wallet',
	 icon: 'pi pi-credit-card'
	},
	{ 
	 id: 3,
	 title: 'Safest wallet on the internet',
	 description: 'We are giving you wallet where you can store all of your coins',
	 icon: 'pi pi-wallet'
	},
	{ 
	 id: 4,
	 title: 'Fastest transaction system in web3',
	 description: 'Use your coins and start sending them with other traders',
	 icon: 'pi pi-arrow-right-arrow-left'
	},
	{ 
	id: 5,
	title: 'Transaction History',
	description: 'We are giving you clear and most concsise transaction history',
	icon: 'pi pi-list'
	},
	{ 
	id: 6,
	title: 'Blockchain technology',
    description: 'App is based on decentralized blockchain technology',
    icon: 'pi pi-share-alt'
	}
]

const hiw_items = [
	{id: 1, title: '1. Step', subtitle: 'Registration', image: register},
	{id: 2, title: '2. Step', subtitle: 'Create a card', image: card},
	{id: 3, title: '3. Step', subtitle: 'Start trading', image: trading},
	{id: 4, title: '4. Step', subtitle: 'Earn Money', image: money}
]

const slides = [
  {
    title: 'The best place to save your cryptocurrencies',
    description: 'Certified web3 wallet, tested and used by many large companies',
    image: wallet,
    alt: 'wallet',
  },
  {
    title: 'Fastest transaction system in the web3 world',
    description: 'Transactions on our system are done in a few seconds.',
    image: transactions,
    alt: 'transactions',
  },
  {
    title: 'Constantly volume tracking',
    description: 'We are tracking volumes and update our customers every few seconds',
    image: volumes,
    alt: 'volumes',
  },
  {
    title: 'Very efficient support service',
    description: 'Write to our support, and you will receive a message in less than an hour',
    image: support,
    alt: 'support',
  },
];

const modules = [Pagination];

</script>

<template>
	<!-- Header-->
	<section id="header">
		<Nav></Nav>
	</section>
	
	<!--Hero-->
	<section id="home" class="section">
	<swiper :spaceBetween="30" :pagination="{clickable: true}" :modules="modules" class="mySwiper">
		<swiper-slide v-for="(slide, index) in slides" :key="index">
			<div>
				<h1>{{ slide.title }}</h1>
				<h4>{{ slide.description }}</h4>
				<RouterLink class="btn" :to="{ name: 'register' }">Sign Up</RouterLink>
			</div>
			<img :src="slide.image" :alt="slide.alt">
		</swiper-slide>
	</swiper>
	</section>
	<div class="overlay"></div>
    
    <!--About Us-->
	<section id="about" class="section">
		<div class="container">
			<img src="../../../assets/crypto_assets/landing_page/bitcoin-hand.webp" alt="image">
			<div class="about-text">
				<h1>About Us</h1>
				<p>Our company begins its history from January 2024, when it was developed.
				Recognizing the importance of Bitcoin from the onset, and understanding that
				the exchange is the most critical part of the cryptocurrency ecosystem, Ognjen
				and Stefan founded eCoinWall to give people the means to quickly and securely invest in the space.</p>
	
				<p>We’re a diverse group of thinkers and doers that are dedicated to making cryptocurrency
				available and accessible to the world and enabling people from all walks of life to invest in their future.
				We believe that everyone should have the freedom to earn, hold, spend, share and give their money - no matter
				 who you are or where you come from.</p>
	
				 <RouterLink class="btn" :to="{ name: 'register' }">Sign Up</RouterLink>
			</div>
		</div>
	</section>

    <!--Choose Us-->
	<section id="choose-us" class="section"> 
		<h1>Why <span class="choose-us-title">Choose Us</span></h1>
		<div class="responsive-container">
			<div v-for="item in items" :key="item.id" class="item">
				<div class="item-content">
					<div class="icon">
					<i :class="[item.icon]" style="color: #fff; font-size: 2rem; background: var(--gradient); padding: 0.6rem; border-radius: 15px;"></i>
					</div>
					<div class="text-content">
					<div class="title">{{ item.title }}</div>
					<div class="description">{{ item.description }}</div>
					</div>
				</div>
			</div>
        </div>
	</section>

    <!--How It Works-->
	<section id="how-it-works" class="section"> 
		<h1>How It <span class="choose-us-title">Works</span></h1>
        <div class="responsive-container">
			<div v-for="item in hiw_items" :key="item.id" class="item">
			<img :src= 'item.image' :alt="item.title" class="item-image" />
			<div class="item-content">
				<div class="title">{{ item.title }}</div>
				<div class="subtitle">{{ item.subtitle }}</div>
			</div>
			</div>
        </div>
	</section>

	<!--Contact-->
	<section id="contact" class="section"> 
		<div class="flex-container">
			<div class="left-side">
				<h1>Have some questions?</h1>
				<p>
					We're here to help! Drop us a message, and our dedicated team 
					will get back to you with the information you need.
				</p>
			</div>
			<div class="right-side">
			     <Form></Form>
			</div>
        </div>
	</section>

	<!--Footer-->
	<Footer></Footer>
</template>
  
<style scoped>
@import url(Home.css);
</style>
  
  
  

  
 
  
  
  
  
  

  

