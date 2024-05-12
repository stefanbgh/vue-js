<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { useCardsStore } from "@/stores/cards.store";
import { useUserStore } from "@/stores/user.store";
import { toast } from "vue3-toastify";
import { toastOptions } from "@/options/toast.options";
import Spinner from "@/components/Spinner/Spinner.vue";

// Defining a Store
const cardsStore = useCardsStore();
const userStore = useUserStore();

// Card UI
const isFormActive = ref(false);
const isCardFlipped = ref(false);

//Card Info
const cardName = ref(null);
const cardNumber = ref(null);
const cardID = ref(null);
const cvv = ref(null);
const cardExpDate = ref(null);
const formattedDate = ref({ month: "", year: "" });
const PIN = ref(null);
const currPin = ref(null);
const newPin = ref(null);

// Card functionalities

// Change PIN
const changeUserPin = async () => {
	isFormActive.value = false;

	const response = await cardsStore.changePin({
		crd_id: cardID.value,
		curr_pin: currPin.value,
		new_pin: newPin.value,
	});

	if (response) {
		toast(response.data.msg, toastOptions);
	}

	currPin.value = null; // clear
	newPin.value = null; //clear
};

// Exp date
const formatDate = (date) => {
	const parts = date.split("-");
	formattedDate.value.month = parts[1];
	formattedDate.value.year = parts[0].substring(2); // Take the last two digits of the year
};

// Card UI
const flipCard = () => {
	isCardFlipped.value = !isCardFlipped.value;
};

const toggleForm = () => {
	isFormActive.value = !isFormActive.value;
};

watchEffect(() => {
	if (userStore.card) {
		cardName.value = userStore.card.crd_fullname;
		cardNumber.value = userStore.card.crd_number;
		cardID.value = userStore.card.crd_id;
		cvv.value = userStore.card.crd_cvv;
		cardExpDate.value = userStore.card.crd_valid;
		PIN.value = userStore.card.crd_pin;

		formatDate(cardExpDate.value);
	}
});
</script>

<template>
	<div v-if="userStore.card">
		<div class="container">
			<section
				class="card"
				:class="{ active: isCardFlipped }"
				@click="flipCard"
			>
				<!-- Front card content -->
				<div class="front">
					<div class="brand-logo" id="brand-logo">
						<img
							src="../../assets/crypto_assets/logo.png"
							alt="card-logo"
						/>
					</div>

					<img
						src="https://raw.githubusercontent.com/falconmasters/formulario-tarjeta-credito-3d/master/img/chip-tarjeta.png"
						class="chip"
					/>

					<div class="details">
						<div class="group" id="number">
							<p class="label">Card Number</p>
							<p class="number">{{ cardNumber }}</p>
						</div>

						<div class="flexbox">
							<div class="group" id="name">
								<p class="label">Card's Holder</p>
								<p class="name">{{ cardName }}</p>
							</div>

							<div class="group" id="expiration">
								<p class="label">Expiration</p>
								<p class="expiration">
									<span class="month">{{
										formattedDate.month
									}}</span>
									/
									<span class="year">{{
										formattedDate.year
									}}</span>
								</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Back card content -->
				<div class="back">
					<div class="magnetic-bar"></div>

					<div class="details">
						<div class="group" id="signature">
							<p class="label">Signature</p>
							<div class="signature">
								<p>{{ cardName }}</p>
							</div>
						</div>

						<div class="group" id="ccv">
							<p class="label">CVV</p>
							<p class="ccv">{{ cvv }}</p>
						</div>
					</div>

					<p class="legend">
						Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Assumenda dicta quos quas porro fuga, accusamus
						necessitatibus expedita illo, ipsum blanditiis quaerat
						deserunt illum minima ex distinctio veritatis aliquid,
						ipsam ut.
					</p>
				</div>
			</section>

			<div class="container-btn">
				<button class="btn-open-form" @click="toggleForm">
					<i v-if="!isFormActive" class="pi pi-angle-down"></i>
					<i v-else class="pi pi-angle-up"></i>
				</button>
			</div>

			<div class="card-form" :class="{ active: isFormActive }">
				<!-- Form content -->
				<div>
					<div class="flexbox">
						<div class="group card-status">
							<h3>Status:</h3>
							<p>{{ userStore.card.crd_status }}</p>
						</div>

						<div class="group card-pin">
							<div>
								<label for="pin">PIN</label>
								<input id="pin" type="password" maxlength="4" v-model.trim="currPin">
							</div>
							<div>
								<label for="new_pin">New PIN</label>
								<input id="new_pin" type="password" maxlength="4" v-model.trim="newPin">
							</div>
						</div>
					</div>

					<button
						type="submit"
						class="btn-submit"
						@click="changeUserPin"
					>
						Change pin
					</button>
				</div>
			</div>
		</div>
	</div>

	<div v-else>
		<Spinner></Spinner>
	</div>
</template>

<style scoped>
@import url(CreditCard.css);
</style>
