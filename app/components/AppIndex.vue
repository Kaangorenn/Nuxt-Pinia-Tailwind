<script setup lang="ts">
import { useMainStore } from '../../stores/mainStore'

const store = useMainStore()
</script>

<template>
    <div class="border p-5 rounded-xl border-zinc-900">
        <h1 class="text-3xl font-bold underline">Hello world!</h1>
        <div class="mt-4">
            <p class="text-xl mb-2">Count: {{ store.count }}</p>
            <button @click="store.increment()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                Increment
            </button>
            <button @click="store.decrement()" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Decrement
            </button>
        </div>
    </div>
</template>