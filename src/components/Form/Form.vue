<script setup>
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { toastOptions } from "@/options/toast.options";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const message = ref("");
const isValidEmail = ref(true); // New variable for email validation

// Flag to track if the form has been submitted
const formSubmitted = ref(false);

const sendToSupport = () => {
  // Set the formSubmitted flag to true
  formSubmitted.value = true;

  // Form validation logic
  if (!firstName.value.trim() || !lastName.value.trim() || !email.value.trim() || !message.value.trim() || !isValidEmail.value) {
    return;
  }

  // If all conditions are met, send the email
  const emailBody = `First Name: ${firstName.value}\nLast Name: ${lastName.value}\nEmail: ${email.value}\n\nMessage:\n${message.value}`;
  window.location.href = `mailto:ecoinwall.help@gmail.com?subject=Support&body=${encodeURIComponent(
    emailBody
  )}`;

  // Reset form fields and formSubmitted flag
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  message.value = "";
  formSubmitted.value = false;

  // Display success message using a toast notification library (e.g., Toastify)
  toast('Just click send on your machine mail system', toastOptions);
};

// Email validation using a regular expression
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validateEmail = () => {
  isValidEmail.value = emailRegex.test(email.value);
};
</script>

<template>
  <form @submit.prevent="sendToSupport">
    <div class="form-group">
      <label for="name">Fullname:</label>
      <div class="form-row">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your name"
          v-model="firstName"
        />
        <input
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Your lastname"
          v-model="lastName"
        />
      </div>
      <!-- Validation message for Fullname fields -->
      <div v-if="(!firstName.trim() && formSubmitted) || (!lastName.trim() && formSubmitted)" class="error-message">
        Please fill out Fullname fields.
      </div>
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Your email"
        v-model="email"
        @input="validateEmail"
      />
      <!-- Validation message for Email field -->
      <div v-if="!email.trim() && formSubmitted" class="error-message">
        Please fill out Email field.
      </div>
      <!-- Validation message for invalid email format -->
      <div v-if="email.trim() && !isValidEmail && formSubmitted" class="error-message">
        Please enter a valid email.
      </div>
    </div>
    <div class="form-group">
      <label for="message">Message:</label>
      <textarea
        id="message"
        name="message"
        placeholder="Your message"
        v-model="message"
      ></textarea>
      <!-- Validation message for Message field -->
      <div v-if="!message.trim() && formSubmitted" class="error-message">
        Please fill out Message field.
      </div>
    </div>
    <div class="form-group">
      <button type="submit">Submit</button>
    </div>
  </form>
</template>

<style scoped>
@import url(Form.css);
</style>
