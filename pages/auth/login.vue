<template>
    <div class="max-w-md mx-auto mt-10">
        <h1 class="text-2xl mb-4">Login via email</h1>
        <form @submit.prevent="onSendOtp">
            <input v-model="email" type="email" placeholder="Email" class="input mb-2 w-full" required />
            <!-- <input v-model="password" type="password" placeholder="Password" class="input mb-2 w-full" required /> -->
            <button :disabled="auth.loading" class="btn btn-primary w-full">Send</button>
            <p v-if="auth.error" class="text-red-500 mt-2">{{ auth.error }}</p>
        </form>
        <!-- <div class="mt-4 text-center">
            <span>Don't have an account?</span>
            <NuxtLink to="/auth/register" class="btn btn-secondary ml-2">Register</NuxtLink>
        </div> -->
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useAuthStore } from '~/stores/authStore'

const email = ref('')
const auth = useAuthStore()

const onSendOtp = async () => {
    const { error } = await auth.signInWithOtp({ email: email.value })
    if (!error) {
        alert('Check your email for the login link.')
    }
}
</script>