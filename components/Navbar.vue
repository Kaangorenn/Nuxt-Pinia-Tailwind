<template>
    <transition name="navbar-slide">
        <div v-if="showNavbar" class="fixed w-full p-5 z-50" @mouseenter="navbarHovered = true" @mouseleave="navbarHovered = false">
            <div class="w-full h-24 rounded-xl p-5 flex justify-between items-center bg-black/10 backdrop-blur-3xl border border-zinc-800">
                <div>
                    <NuxtLink to="/">logo</NuxtLink>
                </div>
                <div class="inline-flex items-center gap-8 justify-between">
                    <NuxtLink to="/">quotes</NuxtLink>
                    <NuxtLink to="/dashboard">dashboard</NuxtLink>
                </div>
                <div class="inline-flex items-center gap-4">
                    <NuxtLink to="/dashboard">dashboard</NuxtLink>
                    <NuxtLink to="/auth/login">log in</NuxtLink>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '~/stores/authStore' // adjust path as needed

const showNavbar = ref(false)
const navbarHovered = ref(false)

const auth = useAuthStore()
const isLoggedIn = computed(() => !!auth.user)

function handleMouseMove(e) {
    if (e.clientY < 50) {
        showNavbar.value = true
    } else if (!navbarHovered.value) {
        showNavbar.value = false
    }
}

onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove)
})
onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
})
</script>
<style scoped>
.navbar-slide-enter-active,
.navbar-slide-leave-active {
    transition: transform 0.3s cubic-bezier(.4, 0, .2, 1), opacity 0.3s;
}

.navbar-slide-enter-from,
.navbar-slide-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}

.navbar-slide-enter-to,
.navbar-slide-leave-from {
    transform: translateY(0);
    opacity: 1;
}
</style>