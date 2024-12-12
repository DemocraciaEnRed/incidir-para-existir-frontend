<script setup>
definePageMeta({
  middleware: ['auth'],
  auth: {
    unauthenticatedOnly: false,
    navigateUnauthenticatedTo: '/login'
  }
})

const { $api } = useNuxtApp()

const theData = ref(null)

const doSomething = async () => {
  const response = await $api('/utils/somethingForUsers')
  console.log('hi')
  console.log(response)
  theData.value = response
  navigateTo({ name: 'index' })
}

// const doSomething = async () => {
//   const { data: respo } =  await useAPI('/utils/somethingForUsers')
//   console.log('hi')
//   console.log(respo)
//   theData.value = respo
// }
</script>

<template>

  <UContainer>
    <h1 class="text-3xl font-bold">Protected Page</h1>
    <p>Click the button to test the custom API fetch</p>
    <UButton @click="doSomething">Fetch</UButton>
    <hr>
    {{ theData }}
  </UContainer>

</template>