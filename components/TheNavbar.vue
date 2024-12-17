<script setup lang="ts">
const { status, signOut } = useAuth()

// computed loggedIn
const loggedIn = computed(() => status.value === 'authenticated')

const handleLogout = async () => {
  try {
    await signOut({ callbackUrl: '/' })
  } catch (error) {
    console.error('Error logging out:', error)
  }
}
</script>

<template>
  <nav id="navbar" class="bg-primary-800 py-4 rounded-br-2xl rounded-bl-2xl">
    <UContainer>
      <div class="flex justify-between items-center">
        <NuxtLink to="/" class="">
          <img src="/img/incidir-para-existir-logo.png" alt="Incidir para existir" class="h-12" >
        </NuxtLink>
        <div class="flex space-x-3">
          <NuxtLink to="/" class="navbar-item">Inicio</NuxtLink>
          <NuxtLink to="/quienes-somos" class="navbar-item">¿Quienes Somos?</NuxtLink>
          <NuxtLink to="/iniciativas" class="navbar-item">Iniciativas de la juventud</NuxtLink>
          <NuxtLink to="/desafios" class="navbar-item">Desafios de la juventud</NuxtLink>
          <NuxtLink to="/noticias" class="navbar-item">Noticias </NuxtLink>
          <UButton to="https://www.instagram.com/movilizatorio" target="_blank" color="mindaro" :ui="{ rounded: 'rounded-full' }">Contactános</UButton>
          <UButton v-if="!loggedIn" to="/login" color="orange" variant="solid" icon="i-heroicons-arrow-left-end-on-rectangle-16-solid">Ingresa</UButton>
          <UButton v-if="loggedIn" color="orange" variant="solid" icon="i-heroicons-arrow-left-start-on-rectangle-16-solid" @click="handleLogout">Salir</UButton>
          <!-- <NuxtLink v-if="!loggedIn" to="/login" class="navbar-item">
            Ingresa<UIcon name="i-heroicons-arrow-left-end-on-rectangle-16-solid" class="size-6 ml-2" />
          </NuxtLink> -->
        </div>
      </div>
    </UContainer>
  </nav>
</template>