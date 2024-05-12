<script setup>
import HeaderVue from "@/components/HeaderVue/HeaderVue.vue";
import CreditCard from "@/components/CreditCard/CreditCard.vue";
import Spinner from "@/components/Spinner/Spinner.vue"
import EditProfile from '@/components/EditProfileModal/EditProfileModal.vue'
import ProfileImage from '@/components/ProfileImage/ProfileImage.vue'
import QuestionModal from '@/components/QuestionModal/QuestionModal.vue'
import { useCardsStore } from '@/stores/cards.store'
import { useUserStore } from '@/stores/user.store';
import { useNotificationsStore } from "@/stores/notifications.store";
import { useImageStore } from "@/stores/image.store";
import { ref } from 'vue';
import { toast } from "vue3-toastify";
import { toastOptions } from "@/options/toast.options";
import { faker } from "@faker-js/faker";
import {useRouter} from 'vue-router';

// Defining a Store
const cardsStore = useCardsStore();
const userStore = useUserStore();
const notificationsStore = useNotificationsStore();
const imageStore = useImageStore();

// Defining Router
const router = useRouter();

//Card info
const fullname = ref(null);
const card_pin = ref(null);
const usr_id = localStorage.getItem('usr_id');
const isActive = ref(false);

//User Info
const user_id = ref(null)
const user_username = ref(null);
const user_password = ref(null);
const user_image = ref(null);

// Modals logic
const isUserModalOpen = ref(false);
const isCardModalOpen = ref(false);
const isImageModalOpen = ref(false);
const isDeleteModalOpen = ref(false);

const formData = ref({
  name: user_username.value,
  password: user_password.value,
  fullname: fullname.value,
  card_pin: card_pin.value
});

const openUserModal = () => {
  isUserModalOpen.value = true;
};

const openCardModal = () => {
	isCardModalOpen.value = true;
};

const openImageModal = () => {
	isImageModalOpen.value = true;
};

const closeUserModal = () => {
  isUserModalOpen.value = false;
  formData.name = '';
  formData.password = '';
};

const closeCardModal = () => {
	isCardModalOpen.value = false;
	formData.fullname = '';
	formData.card_pin = '';
};

//1.Card Logic

//Logic for Making a Card
const submitCardForm = async () => {
	const cardData = {
		usr_id,
		crd_fullname: formData.value.fullname,
		crd_pin: formData.value.card_pin,
		crd_number: faker.finance.creditCardNumber("####-####-####-####"),
		crd_cvv: faker.finance.creditCardCVV(),
	};

	const response = await cardsStore.makeACard(cardData);
	closeCardModal();
	if(response){
		toast(response.data.msg, toastOptions);
		userStore.updateCard(response.data.card);
	}
};

//Logic for sending unblock request to admin
const unblockRequest = async () => {
	isActive.value = true;
	const response = await notificationsStore.notificationRecoveryCard({usr_id})

	if(response){
		toast(response.data.msg, toastOptions);
	}
}

//Logic for sending renewal request to admin
const renewalRequest = async () => {
	isActive.value = true;
	const response = await notificationsStore.notificationRenewalCard({usr_id})

	if(response){
		toast(response.data.msg, toastOptions);
	}
}

//2. Profile Logic

const deleteProfile = async () => {
    const response = await userStore.deleteProfile(usr_id);

    if (response) {
        localStorage.removeItem("usr_id");
        localStorage.removeItem("sid");

        router.push({ name: "register" });
    }
};

const deleteImage = async () => {
    const response = await imageStore.deleteImage(usr_id);

    if (response) {
        userStore.deleteImage();
        imageStore.deleteImage(usr_id);

        toast("Delete profile image successfully", toastOptions);
    }

    isImageModalOpen.value = false;
};

</script>

<template>
	<HeaderVue
	  title="Profile"
	  desc="Here you can edit your profile and see your card informations."
	/>

	<QuestionModal
		v-if="isImageModalOpen"
		question="Are you sure you want to delete profile image?"
		@close-modal="isImageModalOpen = false"
		@delete-data="deleteImage"
	/>

	<QuestionModal
        v-if="isDeleteModalOpen"
        question="Do you agree to delete your profile?"
        @close-modal="isDeleteModalOpen = false"
        @delete-data="deleteProfile"
    />

    <div v-if ='userStore.user'>
		<div class="profile-container">
		<section class="user-info">
			<ProfileImage @open-modal="openImageModal"/>

			<h1 class="main-h">User Info:</h1>
			<div class="user-container">
			<div class="user-container-left">
				<p>Username:</p>
				<p>Email:</p>
				<p v-if="userStore.card">Balance:</p>
			</div>
			<div>
				<p>{{ userStore.user.usr_username }}</p>
				<p>{{ userStore.user.usr_email }}</p>
				<p v-if="userStore.card">${{ userStore.card.crd_balance.toLocaleString() }}</p>
			</div>
			</div>
			<button class="btn" @click="isDeleteModalOpen = true"><i class="pi pi-user-minus"></i></button>
			<button class="btn" @click="openUserModal">Account Settings</button>

			<!--Create Card-->
			<button v-if="!userStore.card" class="btn" @click="openCardModal">Create a Card</button>
			<div style="display: inline-block;" v-else>
				<!--Blocked Card-->
				<button v-if="userStore.card.crd_status === 'blocked' && !isActive" class="btn" @click ='unblockRequest'>Recover card</button>
				<!--Expired Card-->
				<button v-if="userStore.card.crd_status === 'expired' && !isActive" class="btn" @click ='renewalRequest'>Renewal card</button>
			</div>

		</section>
	
		<section class="card-info" v-if="userStore.card">
			<h1 class="main-h">Card Info:</h1>
			<CreditCard></CreditCard>
		</section>
		</div>
	
		<!-- Edit Profile Modal -->
	    <EditProfile v-if="isUserModalOpen" @close-modal="closeUserModal"/>
	
		<div class="make-card-modal">
		<div v-if="isCardModalOpen" class="modal-overlay">
			<div class="modal-content">
			<!-- Form -->
			<form @submit.prevent="submitCardForm">
				<label for="fullname">Fullname:</label><br>
				<input type="text" id="fullname" v-model="formData.fullname" /><br>
	
				<label for="pin">PIN:</label><br>
				<input type="password" id="pin" v-model="formData.card_pin" maxlength="4"/><br>
	
				<!-- Buttons -->
				<div class="button-container">
				<button @click="closeCardModal" class="btn">Cancel</button>
				<button type="submit" class="btn">Create Card</button>
				</div>
	
			</form>
			</div>
		</div>
		</div>
	</div>

	<div v-else>
		<Spinner></Spinner>
	</div>
  </template>
  
  <style scoped>
  @import url(Profile.css);
  </style>
  