<script setup lang="ts">
const { status, signOut, data: userData } = useAuth()

// computed loggedIn
const loggedIn = computed(() => status.value === 'authenticated')

const userFullname = computed(() => {
  if(userData.value) {
    return userData.value.fullName
  }
  return '-'
})

// const mobileBurgerActive = ref(false)

const handleLogout = async () => {
  try {
    await signOut({ callbackUrl: '/' })
  } catch (error) {
    console.error('Error logging out:', error)
  }
}

const items = computed(() => [
  [{
    label: userFullname.value,
    disabled: true
  }], [{
    label: 'Admin',
    to: '/admin',
    icon: 'i-heroicons-cog'
  }, {
    label: 'Salir',
    icon: 'i-heroicons-arrow-left-start-on-rectangle-16-solid',
    click: () => handleLogout()
  }]
])

</script>

<template>
  <nav id="navbar" >
    <div class="bg-primary-800 py-4 rounded-br-2xl rounded-bl-2xl">
      <UContainer>
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="flex-1">
            <img src="/img/incidir-para-existir-logo.png" alt="Incidir para existir" class="h-12 w-auto mr-auto md:ml-0 md:mr-auto" >
          </NuxtLink>
          <div class="hidden md:flex items-center space-x-5 font-oswald uppercase">
            <NuxtLink to="/" active-class="text-mindaro" class="navbar-item">Inicio</NuxtLink>
            <NuxtLink to="/quienes-somos" active-class="text-mindaro" class="navbar-item">¿Quienes Somos?</NuxtLink>
            <NuxtLink to="/iniciativas" active-class="text-mindaro" class="navbar-item leading-none text-center">Iniciativas<br><span class="text-sm font-normal">de la juventud</span></NuxtLink>
            <NuxtLink to="/desafios" active-class="text-mindaro" class="navbar-item leading-none text-center">Desafios<br><span class="text-sm font-normal">de la juventud</span></NuxtLink>
            <NuxtLink to="/actualidad" active-class="text-mindaro" class="navbar-item leading-none text-center">Actualidad<br><span class="text-sm font-normal">de la juventud</span></NuxtLink>
            <UButton to="https://linktr.ee/incidirparaexistir" target="_blank" color="mindaro" :ui="{ rounded: 'rounded-full' }" class="capitalize">Contactános</UButton>
            <!-- <UButton v-if="!loggedIn" to="/login" color="orange" variant="solid" :ui="{ rounded: 'rounded-full' }" icon="i-heroicons-arrow-left-end-on-rectangle-16-solid">Ingresa</UButton> -->
            <!-- <UButton v-if="loggedIn" color="orange" variant="solid" icon="i-heroicons-arrow-left-start-on-rectangle-16-solid" @click="handleLogout">Salir</UButton> -->
            <!-- <NuxtLink v-if="!loggedIn" to="/login" class="navbar-item">
              Ingresa<UIcon name="i-heroicons-arrow-left-end-on-rectangle-16-solid" class="size-6 ml-2" />
            </NuxtLink> -->
            <UDropdown v-if="loggedIn" :items="items" class="font-inter capitalize" :popper="{ placement: 'bottom-start' }">
              <UAvatar :alt="userFullname" />
            </UDropdown>
          </div>
        </div>
      </UContainer>
    </div>
  </nav>
</template>