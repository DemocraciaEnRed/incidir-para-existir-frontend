import type { UseFetchOptions } from 'nuxt/app'

export function useLazyAPI<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>,
) {
  return useLazyFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api as typeof $fetch
  })
}

// import type { FetchError } from 'ofetch'
// import type { UseFetchOptions } from 'nuxt/app'

// interface CustomError {
//   message: string
//   statusCode: number
// }

// export function useAPI<T>(
//   url: string | (() => string),
//   options?: UseFetchOptions<T>,
// ) {
//   return useFetch<T, FetchError<CustomError>>(url, {
//     ...options,
//     $fetch: useNuxtApp().$api
//   })
// }