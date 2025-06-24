<template>
    <div class="h-screen w-screen flex items-center justify-center" :style="slideshowStyle">
        <div v-if="quoteStore.loading">Loading...</div>
        <div v-else-if="quoteStore.quotes.length > 0">
            <Transition :name="settings.animation_type" mode="out-in" :duration="{ enter: settings.animation_speed, leave: settings.animation_speed }">
                <div class="flex flex-col gap-5" :key="quoteStore.currentQuote?.id">
                    <div class="italic font-extralight" :style="quoteTextStyle">
                        {{ quoteStore.currentQuote?.translation?.text }}
                    </div>
                    <div class="inline-flex items-center justify-between w-full">
                        <div v-if="settings.show_likes" class="text-left flex items-center gap-2">
                            Likes: {{ quoteStore.currentQuote?.likes_count }}
                            <button class="btn btn-sm" @click="quoteStore.likeQuote(quoteStore.currentQuote)" :disabled="!authStore.user" title="Like this quote">
                                👍
                            </button>
                        </div>
                        <div v-if="settings.show_author" class="text-right" :style="authorTextStyle">
                            {{ quoteStore.currentQuote?.author }}
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
        <div v-else>No quotes found.</div>
        <SettingsPanel />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useQuoteStore } from '~/stores/quoteStore'
import { useAuthStore } from '~/stores/authStore'
import { storeToRefs } from 'pinia'

const quoteStore = useQuoteStore()
const authStore = useAuthStore()
const { settings, savingSettings, settingsError } = storeToRefs(quoteStore)

onMounted(() => {
    authStore.fetchUser()
})

const slideshowStyle = computed(() => ({
    background: settings.value.background_color,
    fontFamily: settings.value.font || undefined,
    transition: 'background 0.5s',
}))

const quoteTextStyle = computed(() => ({
    fontSize: `${settings.value.text_size || 48}px`,
    fontWeight: settings.value.bold ? 'bold' : 'normal',
    fontStyle: settings.value.italic ? 'italic' : 'normal',
    textDecoration: settings.value.underlined ? 'underline' : 'none',
    color: settings.value.text_color,
    fontFamily: settings.value.font || undefined,
}))

const authorTextStyle = computed(() => ({
    fontSize: `${settings.value.author_font_size || 18}px`,
    fontWeight: settings.value.author_bold ? 'bold' : 'normal',
    fontStyle: settings.value.author_italic ? 'italic' : 'normal',
    textDecoration: settings.value.author_underlined ? 'underline' : 'none',
    color: settings.value.author_color || settings.value.text_color,
    fontFamily: settings.value.author_font || undefined,
}))

onMounted(async () => {
    await quoteStore.initQuotesPage()
    authStore.fetchUser()
})

onUnmounted(() => {
    quoteStore.stopInterval()
})
</script>
<style scoped>
/* Blur Scale (already present) */
.quote-blur-scale-enter-active,
.quote-blur-scale-leave-active {
    transition:
        filter 1s,
        transform 1s,
        opacity 1s;
}

.quote-blur-scale-enter-from {
    filter: blur(10px);
    transform: scale(1.1);
    opacity: 0;
}

.quote-blur-scale-enter-to {
    filter: blur(0);
    transform: scale(1);
    opacity: 1;
}

.quote-blur-scale-leave-from {
    filter: blur(0);
    transform: scale(1);
    opacity: 1;
}

.quote-blur-scale-leave-to {
    filter: blur(10px);
    transform: scale(1.1);
    opacity: 0;
}

/* Fade */
.quote-fade-enter-active,
.quote-fade-leave-active {
    transition: opacity 1s;
}

.quote-fade-enter-from,
.quote-fade-leave-to {
    opacity: 0;
}

.quote-fade-enter-to,
.quote-fade-leave-from {
    opacity: 1;
}

/* Slide */
.quote-slide-enter-active,
.quote-slide-leave-active {
    transition: transform 1s, opacity 1s;
}

.quote-slide-enter-from {
    transform: translateX(100%);
    opacity: 0;
}

.quote-slide-enter-to {
    transform: translateX(0);
    opacity: 1;
}

.quote-slide-leave-from {
    transform: translateX(0);
    opacity: 1;
}

.quote-slide-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}
</style>