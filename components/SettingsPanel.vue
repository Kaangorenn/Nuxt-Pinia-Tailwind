<template>
    <transition name="sidebar-slide">
        <div v-if="showSettings" class="fixed top-0 right-0 h-full w-80 z-50 bg-white/95 backdrop-blur-sm shadow-2xl border-l border-gray-200">
            <!-- Header -->
            <div class="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 class="text-lg font-semibold text-gray-900">Settings</h2>
                <button type="button" class="p-2 rounded-lg hover:bg-gray-100 transition-colors" @click="showSettings = false">
                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Scrollable Content -->
            <div class="flex-1 overflow-y-auto p-6">
                <form class="space-y-6" @submit.prevent="saveSettings">
                    <!-- Display Options -->
                    <div class="space-y-4">
                        <h3 class="text-sm font-medium text-gray-900">Display Options</h3>
                        <div class="space-y-3">
                            <label class="flex items-center space-x-3">
                                <input type="checkbox" v-model="settings.show_likes" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span class="text-sm text-gray-700">Show Likes</span>
                            </label>
                            <label class="flex items-center space-x-3">
                                <input type="checkbox" v-model="settings.show_author" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span class="text-sm text-gray-700">Show Author</span>
                            </label>
                        </div>
                    </div>

                    <!-- Text Styling -->
                    <div class="space-y-4">
                        <h3 class="text-sm font-medium text-gray-900">Text Styling</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-medium text-gray-700 mb-1">Text Size</label>
                                <input type="number" v-model.number="settings.text_size" min="10" max="120" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" />
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-gray-700 mb-1">Font</label>
                                <input type="text" v-model="settings.font" placeholder="Arial" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" />
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-medium text-gray-700 mb-1">Text Color</label>
                                <input type="color" v-model="settings.text_color" class="w-full h-10 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-gray-700 mb-1">Background</label>
                                <input type="color" v-model="settings.background_color" class="w-full h-10 border border-gray-300 rounded-md" />
                            </div>
                        </div>

                        <div class="flex space-x-4">
                            <label class="flex items-center space-x-2">
                                <input type="checkbox" v-model="settings.bold" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span class="text-sm text-gray-700">Bold</span>
                            </label>
                            <label class="flex items-center space-x-2">
                                <input type="checkbox" v-model="settings.italic" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span class="text-sm text-gray-700">Italic</span>
                            </label>
                        </div>
                    </div>

                    <!-- Author Style -->
                    <div class="space-y-4">
                        <h3 class="text-sm font-medium text-gray-900">Author Style</h3>
                        <div class="bg-gray-50 p-4 rounded-lg space-y-3">
                            <div class="grid grid-cols-2 gap-3">
                                <div>
                                    <label class="block text-xs font-medium text-gray-700 mb-1">Font</label>
                                    <input type="text" v-model="settings.author_font" placeholder="Arial" class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                                </div>
                                <div>
                                    <label class="block text-xs font-medium text-gray-700 mb-1">Size</label>
                                    <input type="number" v-model.number="settings.author_font_size" min="10" max="72" class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                                </div>
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-gray-700 mb-1">Color</label>
                                <input type="color" v-model="settings.author_color" class="w-full h-8 border border-gray-300 rounded" />
                            </div>
                            <div class="flex flex-wrap gap-3">
                                <label class="flex items-center space-x-2">
                                    <input type="checkbox" v-model="settings.author_bold" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    <span class="text-xs text-gray-700">Bold</span>
                                </label>
                                <label class="flex items-center space-x-2">
                                    <input type="checkbox" v-model="settings.author_italic" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    <span class="text-xs text-gray-700">Italic</span>
                                </label>
                                <label class="flex items-center space-x-2">
                                    <input type="checkbox" v-model="settings.author_underlined" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    <span class="text-xs text-gray-700">Underline</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Animation Settings -->
                    <div class="space-y-4">
                        <h3 class="text-sm font-medium text-gray-900">Animation Settings</h3>
                        <div class="space-y-3">
                            <div>
                                <label class="block text-xs font-medium text-gray-700 mb-1">Animation Speed (ms)</label>
                                <input type="number" v-model.number="settings.animation_speed" min="100" max="5000" step="100" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" />
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-gray-700 mb-1">Time Between Quotes (ms)</label>
                                <input type="number" v-model.number="settings.quote_interval" min="100" max="60000" step="100" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" />
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-gray-700 mb-1">Animation Type</label>
                                <select v-model="settings.animation_type" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm">
                                    <option value="quote-blur-scale">Blur Scale</option>
                                    <option value="quote-fade">Fade</option>
                                    <option value="quote-slide">Slide</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Footer -->
            <div class="border-t border-gray-200 p-6">
                <div class="flex space-x-3">
                    <button type="button" class="flex-1 bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors" @click="saveSettings">
                        Save Settings
                    </button>
                    <button type="button" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors" @click="showSettings = false">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </transition>

    <!-- Backdrop -->
    <transition name="backdrop-fade">
        <div v-if="showSettings" class="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" @click="showSettings = false"></div>
    </transition>

    <!-- Settings Trigger Button (optional - for testing) -->
    <button v-if="!showSettings" @click="showSettings = true" class="fixed bottom-4 right-4 bg-transparent hover:cursor-pointer text-white p-3 rounded-full shadow-lg transition-colors z-30">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useQuoteStore } from '~/stores/quoteStore'

const quoteStore = useQuoteStore()
const settings = quoteStore.settings

const saveSettings = async () => {
    await quoteStore.saveSettings()
    showSettings.value = false
}

const showSettings = ref(false)

// Optional: Keep the mouse trigger functionality if you want it
// You can remove this section if you only want button-triggered sidebar
const settingsHovered = ref(false)

function handleMouseMove(e) {
    // Trigger from right edge instead of bottom
    if (window.innerWidth - e.clientX < 50) {
        showSettings.value = true
    }
}

// Handle escape key to close sidebar
function handleKeyDown(e) {
    if (e.key === 'Escape' && showSettings.value) {
        showSettings.value = false
    }
}

onMounted(() => {
    // Uncomment if you want mouse edge trigger
    // window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
    // window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
/* Sidebar slide animation */
.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-slide-enter-from,
.sidebar-slide-leave-to {
    transform: translateX(100%);
}

.sidebar-slide-enter-to,
.sidebar-slide-leave-from {
    transform: translateX(0);
}

/* Backdrop fade animation */
.backdrop-fade-enter-active,
.backdrop-fade-leave-active {
    transition: opacity 0.3s ease;
}

.backdrop-fade-enter-from,
.backdrop-fade-leave-to {
    opacity: 0;
}

.backdrop-fade-enter-to,
.backdrop-fade-leave-from {
    opacity: 1;
}

/* Custom scrollbar for webkit browsers */
.overflow-y-auto::-webkit-scrollbar {
    width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}
</style>