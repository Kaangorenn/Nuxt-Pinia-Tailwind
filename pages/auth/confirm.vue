<template>
    <div class="container mx-auto mt-10">
        <h1 class="text-2xl mb-4">Confirming login...</h1>
        <p v-if="error" class="text-red-500">{{ error }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/authStore'
import { useSupabaseClient } from '#imports'

definePageMeta({
    ssr: false
})

const error = ref('')
const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const supabase = useSupabaseClient()

onMounted(async () => {
    try {
        // If token_hash is present, manually exchange it for a session
        const tokenHash = route.query.token_hash
        const type = route.query.type
        if (tokenHash && type === 'email') {
            const { data, error: verifyError } = await supabase.auth.verifyOtp({
                type: 'email',
                token_hash: tokenHash,
            })
            if (verifyError) {
                error.value = verifyError.message
                return
            }
        }
        await auth.fetchUser()
        if (auth.user) {
            router.push('/dashboard')
        } else {
            error.value = 'Could not log you in. Please try again.'
        }
    } catch (e) {
        error.value = e.message
    }
})
</script>