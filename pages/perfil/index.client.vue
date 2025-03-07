<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'user',
  auth: {
    unauthenticatedOnly: false,
    navigateUnauthenticatedTo: '/login'
  }
})

const { data: userData } = useAuth()
//json example:
// { "fullName": "Maria Juan", "id": 3, "firstName": "Maria", "lastName": "Juan", "role": "reporter", "subdivisionId": 1, "subdivision": { "id": 1, "name": "Nro. 1", "city": { "id": 1, "name": "Cali" } } }


</script>

<template>
  <div>
    <div class="space-y-1">
      <h1 class="font-oswald uppercase text-4xl">Mi perfil</h1>
      <br>
      <UCard>
        <div class="flex items-center space-x-4">
          <UAvatar size="3xl" :src="userData && userData.imageUrl || undefined" :alt="userData.fullName" />
          <div> 
            <p class="font-inter text-3xl font-bold">{{ userData.fullName }}</p>
            <p v-if="userData.subdivisionId">{{ userData.subdivision.name }}, {{ userData.subdivision.city.name }}</p>
          </div>
        </div>
      </UCard>

    </div>
  </div>
</template>
