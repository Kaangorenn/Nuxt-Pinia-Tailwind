<template>
    <div class="container mx-auto mt-10">
        <h1 class="text-3xl mb-6">Dashboard</h1>
        <p>Welcome, {{ auth.user ? auth.user.user_metadata.username : 'Guest' }}!</p>
        <button @click="logout" class="btn btn-secondary mt-4">Logout</button>
        <button @click="goToQuotes" class="btn btn-primary mt-4 ml-4">My Quotes</button>
    </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/authStore'
import { useRouter } from 'vue-router'

defineNuxtRouteMiddleware(async (to, from) => {
    const auth = useAuthStore()
    await auth.fetchUser()
    console.log('User after fetchUser:', auth.user)
    if (!auth.user) {
        return navigateTo('/auth/login')
    }
})
const auth = useAuthStore()
const router = useRouter()
const logout = async () => {
    await auth.logout()
    router.push('/auth/login')
}
const goToQuotes = () => {
    router.push('/dashboard/quotes')
}
</script>