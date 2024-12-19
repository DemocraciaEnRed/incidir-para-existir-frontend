// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-13",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxt/fonts",
    "@sidebase/nuxt-auth",
    '@nuxt/eslint',
    'nuxt-echarts'
  ],
  colorMode: {
    preference: 'dark'
  },
  echarts: {
    renderer: ['svg', 'canvas'],
    charts: ['PieChart'],
    components: ['TitleComponent','TooltipComponent','LegendComponent']
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
    }
  },
  // refer to https://auth.sidebase.io/guide/local/quick-start (0.9.4)
  auth: {
    baseURL: process.env.NUXT_AUTH_BASE_URL || 'http://localhost:3000/',
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: 'auth/login', method: 'post' }, 
        getSession: { path: 'auth/session', method: 'get' },
        // signUp: false,
        signOut: { path: 'auth/logout', method: 'post' },
      },
      session: {
        dataType: { 
          id: 'string', 
          email: 'string', 
           role: '\'admin\' | \'user\'', 
        },
        // dataResponsePointer: '/'
      },
      token: {
        type: 'Bearer',
        cookieName: 'movilizatorio.auth.token',
        headerName: 'Authorization',
        maxAgeInSeconds: 172800, // 2days
        sameSiteAttribute: 'lax',
        cookieDomain: process.env.NUXT_COOKIE_DOMAIN || 'localhost',
        secureCookieAttribute: process.env.NODE_ENV === 'production' ? true : false,
        httpOnlyCookieAttribute: false,
      },
    }
  }
})
