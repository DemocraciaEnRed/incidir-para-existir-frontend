export default defineNuxtPlugin((nuxtApp) => {
  const { token } = useAuth()
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: config.public.apiUrl,

    onRequest({ request, options, error }) {
      if (token.value) {
        // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
        options.headers.set('Authorization', `${token.value}`)
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/login'))
      }
    }
  })

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api
    }
  }
})