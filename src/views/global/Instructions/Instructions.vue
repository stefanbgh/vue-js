<script setup>
import { ref, onMounted } from 'vue';
import Nav from '@/components/Navbar/Navbar.vue'
import Footer from '@/components/Footer/Footer.vue'

const isMenuOpen = ref(false);
// Logic for sticky nav bar
const isHeaderFixed = ref(false);

onMounted(() => {
	window.addEventListener('scroll', handleScroll);
});

const handleScroll = () => {
	isHeaderFixed.value = window.scrollY > 0;
};

</script>

<template>
	<!--Header-->
    <Nav></Nav>

	<section class="legal">
		<h1>1.Terms of use</h1>

		<p>
			1.1   Acceptance of the these terms of use. By accessing, reading, and making use of this Website and the Services, you
			are deemed to have reviewed, understood and accepted, on your own behalf and on behalf of any person on 
			whose behalf you may be acting, these Terms of Use and agreed with the Company to be bound hereunder.
			For the purposes of these Terms of Use, “person” means any natural person, corporation, partnership, joint 
			venture or any other incorporated or unincorporated entity, whether acting as an individual, fiduciary, or in
			any other capacity.If you do not wish to be bound by these Terms of Use, you may not use this Website or
			any of the Services.
		</p>

		<p>
			1.2  Changes of terms of use and website. The Company reserves the right, exercisable at any time at its
			sole discretion, to add to or remove, modify or otherwise change any part of these Terms of Use. 
			Changes will be effective immediately at such time as the Terms of Use are posted on this Website. 
			You should check the Terms of Use for changes by checking the date this page was last updated.
			If any change to the Terms of Use is not acceptable to you, you must discontinue your use of this 
			Website and the Services immediately. Your continued use of this Website or any of the Services 
			after any changes to the Terms and Conditions will constitute your unqualified acceptance of the
			changes.
			The Company may terminate, change, suspend or discontinue any aspect of this Website
			or the Services at any time without notice. Without limiting the generality of the foregoing, the 
			Company may change the availability of any features, institute new, or amend existing fees or 
			charges for the use of the Website, the Services, or any features included in the Website or the 
			Services, add, remove, modify or otherwise change any content on this Website, and impose limits 
			on certain features or restrict access to parts or all of this Website. The Company reserves the right,
			but not the duty, to correct any errors or omissions in any portion of this Website at any time and without notice.
		</p>

		<p>
			1.3   Other agreements. These Terms of Use are in addition to and supplementary to any other agreements
            that you or any person you represent have or may enter into with the Company concerning your dealings
            with them, including any information, products or services provided by the Company. In the event of any 
            inconsistency or conflict between the provisions of these Terms of Use and the provisions of any other 
            agreement that you or any person you represent have with the Company, the provisions of these Terms 
            of Use shall govern regarding your access to and use of the Website and the Services.
		</p>

		<h1>2.Privacy Policy</h1>

		<h4>2.1 General:</h4>

		<p>
			eCoinWall is committed to protecting and respecting your privacy. This Privacy Policy (together with our Terms of Use) 
            governs our collection, processing and use of your Personal Information. We define 'Personal Information' as 
            information which identifies you personally, e.g. your name, address, e-mail address, trades etc.
		</p>

		<h4>2.2 The types of Personal Information which we collect may include:</h4>

	    <p>
            We will process your Personal Information only for the purpose(s) of 
            providing to you the service(s) that you ask us to provide you and to satisfy the
            legal obligations stemming from regulatory obligations that arise from providing you the service(s)
		</p>

		<h4>2.3 IP Adress:</h4>

	    <p>
			We may collect information about your computer, including where available your IP address, operating system
			and browser type, for system administration and to report aggregate information to our advertisers. 
			This is statistical data about our users' browsing actions and patterns and will not be used to identify any
			individual unless that same individual.
		</p>
	</section>

	<!--Footer-->
	<Footer></Footer>
</template>

<style scoped>
  @import url(Instructions.css);
</style>
