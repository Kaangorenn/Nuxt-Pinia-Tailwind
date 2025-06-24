<template>
    <div class="max-w-md mx-auto mt-10">
        <h1 class="text-2xl mb-4">Register</h1>
        <form @submit.prevent="onRegister">
            <input v-model="email" type="email" placeholder="Email" class="input mb-2 w-full" required />
            <input v-model="username" type="text" placeholder="Username" class="input mb-2 w-full" required />
            <input v-model="password" type="password" placeholder="Password" class="input mb-2 w-full" required />
            <button :disabled="auth.loading" class="btn btn-primary w-full">Register</button>
            <p v-if="auth.error" class="text-red-500 mt-2">{{ auth.error }}</p>
        </form>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/authStore'

const email = ref('')
const username = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

const onRegister = async () => {
    const { error } = await auth.register({ email: email.value, password: password.value, username: username.value })
    if (!error) {
        router.push('/dashboard')
    }
}
</script>