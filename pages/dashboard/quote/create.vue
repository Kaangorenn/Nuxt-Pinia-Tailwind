<template>
    <div class="max-w-md mx-auto mt-10">
        <h1 class="text-2xl mb-4">Create Quote</h1>
        <form @submit.prevent="onCreate">
            <input v-model="author" type="text" placeholder="Author" class="input mb-2 w-full" required />
            <textarea v-model="text" placeholder="Quote text" class="input mb-2 w-full" required />
            <button :disabled="quoteStore.loading" class="btn btn-primary w-full">Create</button>
            <p v-if="quoteStore.error" class="text-red-500 mt-2">{{ quoteStore.error }}</p>
        </form>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuoteStore } from '~/stores/quoteStore'

const author = ref('')
const text = ref('')
const status = ref('private') // Default status
const router = useRouter()
const quoteStore = useQuoteStore()

const onCreate = async () => {
    const success = await quoteStore.createQuote({
        author: author.value,
        text: text.value,
        status: status.value
    })
    if (success) {
        router.push('/dashboard/quotes')
    }
}
</script>