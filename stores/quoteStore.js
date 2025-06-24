import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '~/stores/authStore'
import { useRouter } from 'vue-router'

export const useQuoteStore = defineStore('quote', {
    state: () => ({
        quotes: [],
        loading: false,
        error: null,
        currentQuote: null,
        paused: false,
        intervalId: null,
        settings: {
            text_size: 48,
            text_color: '#ffffff',
            background_color: '#000000',
            font: '',
            bold: false,
            italic: false,
            underlined: false,
            show_likes: true,
            show_author: true,
            author_font: '',
            author_font_size: 18,
            author_color: '#ffffff',
            author_bold: false,
            author_italic: false,
            author_underlined: false,
            animation_speed: 1000,
            quote_interval: 5000,
            animation_type: 'blur-scale',
        },
        savingSettings: false,
        settingsError: '',
    }),
    actions: {
        async fetchQuotes({ onlyMine = false } = {}) {
            this.loading = true
            this.error = null
            const supabase = useSupabaseClient()
            let query = supabase
                .from('quotes')
                .select(`
                    *,
                    quote_translations(*),
                    quote_likes(*)
                `)
                .order('created_at', { ascending: false })

            if (onlyMine) {
                const auth = useAuthStore()
                const user = auth.user
                if (!user?.id) {
                    this.loading = false
                    this.error = 'Not logged in'
                    return
                }
                query = query.eq('created_by', user.id)
            }

            const { data, error } = await query
            if (error) {
                this.error = error.message
                this.loading = false
                return
            }
            this.quotes = data.map(q => ({
                ...q,
                translation: q.quote_translations?.[0] || null,
                likes_count: q.quote_likes?.length || 0,
            }))
            this.loading = false
            this.pickRandomQuote()
        },
        pickRandomQuote() {
            if (this.quotes.length > 0) {
                let idx
                do {
                    idx = Math.floor(Math.random() * this.quotes.length)
                } while (this.quotes[idx]?.id === this.currentQuote?.id && this.quotes.length > 1)
                this.currentQuote = this.quotes[idx]
            }
        },
        startInterval() {
            if (this.intervalId) return
            this.intervalId = setInterval(() => {
                if (!this.paused) this.pickRandomQuote()
            }, this.settings.quote_interval)
        },
        stopInterval() {
            if (this.intervalId) {
                clearInterval(this.intervalId)
                this.intervalId = null
            }
        },
        async fetchSettings() {
            const auth = useAuthStore()
            const user = auth.user
            if (!user?.id) return
            const supabase = useSupabaseClient()
            const { data, error } = await supabase
                .from('user_slideshow_settings')
                .select('*')
                .eq('user_id', user.id)
                .single()
            if (data) {
                Object.assign(this.settings, data)
            }
        },
        async saveSettings() {
            const auth = useAuthStore()
            const user = auth.user
            const router = useRouter()
            if (!user?.id) {
                router.push('/auth/login')
                return
            }
            this.savingSettings = true
            this.settingsError = ''
            const supabase = useSupabaseClient()
            const payload = { ...this.settings, user_id: user.id }
            const { error } = await supabase
                .from('user_slideshow_settings')
                .upsert(payload, { onConflict: 'user_id' })
            if (error) this.settingsError = error.message
            this.savingSettings = false
        },
        async initQuotesPage() {
            await this.fetchQuotes()
            await this.fetchSettings()
            this.startInterval()
        },
        async createQuote({ author, text }) {
            this.loading = true
            this.error = null
            const auth = useAuthStore()
            const user = auth.user
            if (!user?.id) {
                this.error = 'Not logged in'
                this.loading = false
                return false
            }
            const supabase = useSupabaseClient()
            // Insert quote
            const { data, error } = await supabase
                .from('quotes')
                .insert([{
                    author,
                    created_by: user.id,
                    status: 'private'
                }])
                .select()
                .single()
            if (error) {
                this.error = error.message
                this.loading = false
                return false
            }
            // Insert translation
            await supabase
                .from('quote_translations')
                .insert([{
                    quote_id: data.id,
                    language: 'en',
                    text
                }])
            this.loading = false
            return true
        },
        async likeQuote(quote) {
            const auth = useAuthStore()
            const user = auth.user
            if (!user?.id) {
                alert('You must be logged in to like quotes.')
                return
            }
            const supabase = useSupabaseClient()
            // Prevent duplicate likes
            const { data: existing } = await supabase
                .from('quote_likes')
                .select('*')
                .eq('quote_id', quote.id)
                .eq('user_id', user.id)
                .single()
            if (existing) return

            await supabase
                .from('quote_likes')
                .insert([{ quote_id: quote.id, user_id: user.id }])
            // Optionally, refresh quotes or likes count
            await this.fetchQuotes()
        },
    }
})