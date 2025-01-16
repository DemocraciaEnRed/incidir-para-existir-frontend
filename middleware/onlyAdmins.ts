export default defineNuxtRouteMiddleware((to) => {

  const { status, data, signIn } = useAuth()

  // Return immediately if user is not authenticated
  if (status.value !== 'authenticated') {
    return navigateTo('/login')
  }

  // Redirect to home if user is not an admin
  if(!data.value || data.value.role !== 'admin') {
    // return navigateTo('/')
    throw createError({
      status: 403,
      statusText: 'You are not authorized to access this page'
    })
  }

  // Continue to the route
  return

})