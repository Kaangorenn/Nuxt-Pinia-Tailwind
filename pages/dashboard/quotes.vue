<template>
    <div class="max-w-2xl mx-auto mt-10">
        <h1 class="text-2xl mb-4">My Quotes</h1>
        <button @click="goToCreate" class="btn btn-primary mb-4">Create Quote</button>
        <div v-if="quoteStore.loading">Loading...</div>
        <div v-else>
            <div v-for="quote in quoteStore.quotes" :key="quote.id" class="border p-4 mb-4">
                <div class="font-bold">{{ quote.author }}</div>
                <div>{{ quote.translation?.text }}</div>
                <div class="flex items-center mt-2">
                    <button @click="quoteStore.likeQuote(quote)" class="btn btn-sm mr-2">
                        👍 {{ quote.likes_count }}
                    </button>
                    <button @click="quoteStore.deleteQuote(quote)" class="btn btn-sm btn-danger" v-if="quote.created_by === user.id">
                        Delete
                    </button>
                </div>
            </div>
            <div v-if="quoteStore.quotes.length === 0">No quotes found.</div>
        </div>
        <p v-if="quoteStore.error" class="text-red-500 mt-2">{{ quoteStore.error }}</p>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/authStore'
import { useQuoteStore } from '~/stores/quoteStore'

const router = useRouter()
const auth = useAuthStore()
const user = auth.user
const quoteStore = useQuoteStore()

const goToCreate = () => {
    router.push('/dashboard/quote/create')
}

onMounted(() => {
    quoteStore.fetchQuotes({ onlyMine: true })
})
</script>