<script setup>
import { useMainStore } from '~/stores/mainStore';
const mainStore = useMainStore();

const plus_button = () => {
    mainStore.increment();
}
const minus_button = () => {
    mainStore.decrement();
}
</script>
<template>
    <div class="w-screen h-screen flex items-center justify-center">
        <div class="text-center">
            <p class="text-2xl underline bg-blue-500 p-5 text-white">Hello World!</p>
            <div class="grid grid-cols-2">
                <button @click="plus_button" class="bg-green-500 p-5 text-white">+</button>
                <button @click="minus_button" class="bg-red-500 p-5 text-white">-</button>
                <p class="text-2xl col-span-2">Count: {{ mainStore.count }}</p>
            </div>
        </div>
    </div>
</template>