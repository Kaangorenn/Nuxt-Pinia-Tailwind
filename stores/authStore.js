import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        loading: false,
        error: null
    }),
    actions: {
        async register({ email, password, username }) {
            const supabase = useSupabaseClient() // ✅ inside action
            this.loading = true
            this.error = null
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: { data: { username } }
            })
            if (error) this.error = error.message
            this.user = data.user
            this.loading = false
            return { data, error }
        },
        async login({ email, password }) {
            const supabase = useSupabaseClient() // ✅ inside action
            this.loading = true
            this.error = null
            const { data, error } = await supabase.auth.signInWithPassword({ email, password })
            if (error) this.error = error.message
            this.user = data.user
            this.loading = false
            return { data, error }
        },
        async logout() {
            const supabase = useSupabaseClient() // ✅ inside action
            await supabase.auth.signOut()
            this.user = null
        },
        async fetchUser() {
            const supabase = useSupabaseClient()
            const { data, error } = await supabase.auth.getUser()
            console.log('fetchUser result:', data, error)
            this.user = data.user
        },
        async signInWithOtp({ email }) {
            const supabase = useSupabaseClient()
            this.loading = true
            this.error = null
            const { data, error } = await supabase.auth.signInWithOtp({ email })
            if (error) this.error = error.message
            this.loading = false
            return { data, error }
        }
    },
    persist: {
        storage: piniaPluginPersistedstate.cookies(),
    },
})