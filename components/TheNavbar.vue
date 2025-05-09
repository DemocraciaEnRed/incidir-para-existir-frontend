<script setup>
const { status, signOut, data: userData } = useAuth()

// computed loggedIn
const loggedIn = computed(() => status.value === 'authenticated')

const userFullname = computed(() => {
  if(userData.value) {
    return userData.value.fullName
  }
  return '-'
})

const mobileBurgerActive = ref(false)

const handleLogout = async () => {
  try {
    await signOut({ callbackUrl: '/' })
    mobileBurgerActive.value = false
  } catch (error) {
    console.error('Error logging out:', error)
  }
}

const items = computed(() => {
  if(!userData.value) return []

  const navbarOptions = [
    [{
      label: userFullname.value,
      disabled: true
    }]
  ]

  if(userData && userData.value.role == 'admin') {
    const adminOptions = [[{
      label: 'Admin',
      to: '/admin',
      icon: 'i-heroicons-cog',
      click: () => mobileBurgerActive.value = false
    }], [{
      label: 'Mi perfil',
      to: '/perfil',
      icon: 'i-heroicons-user',
      click: () => mobileBurgerActive.value = false
    }, {
      label: 'Salir',
      icon: 'i-heroicons-arrow-left-start-on-rectangle-16-solid',
      click: () => handleLogout()
    }]]
    navbarOptions.push(...adminOptions)
  } else {
    const memberOptions = [
    [{
      label: 'Mis posteos',
      to: '/perfil/posts',
      icon: 'i-heroicons-document-text',
      click: () => mobileBurgerActive.value = false
    }],
    [{
      label: 'Mi perfil',
      to: '/perfil',
      icon: 'i-heroicons-user',
      click: () => mobileBurgerActive.value = false
    }, {
      label: 'Salir',
      icon: 'i-heroicons-arrow-left-start-on-rectangle-16-solid',
      click: () => handleLogout()
    }]
    ]
    navbarOptions.push(...memberOptions)
  }

  return navbarOptions
}) 
</script>

<template>
  <nav id="navbar" >
    <div class="bg-primary-800 py-4 rounded-br-2xl rounded-bl-2xl">
      <UContainer>
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="">
            <img src="/img/incidir-para-existir-logo.png" alt="Incidir para existir" class="h-12 w-auto mr-auto md:ml-0 md:mr-auto" >
          </NuxtLink>
          <div class="hidden md:flex items-center space-x-5 font-oswald uppercase">
            <NuxtLink to="/" active-class="text-mindaro" class="navbar-item">Inicio</NuxtLink>
            <NuxtLink to="/quienes-somos" active-class="text-mindaro" class="navbar-item">¿Quienes Somos?</NuxtLink>
            <NuxtLink to="/iniciativas" active-class="text-mindaro" class="navbar-item leading-none text-center">Iniciativas<br><span class="text-sm font-normal">de la juventud</span></NuxtLink>
            <NuxtLink to="/desafios" active-class="text-mindaro" class="navbar-item leading-none text-center">Desafíos<br><span class="text-sm font-normal">de la juventud</span></NuxtLink>
            <NuxtLink to="/actualidad" active-class="text-mindaro" class="navbar-item leading-none text-center">Actualidad<br><span class="text-sm font-normal">de la juventud</span></NuxtLink>
            <UButton to="/contacto" color="mindaro" :ui="{ rounded: 'rounded-full' }" class="capitalize">Contactanos</UButton>
            <UButton v-if="!loggedIn" to="/login" color="orange" variant="solid" :ui="{ rounded: 'rounded-full' }" icon="i-heroicons-arrow-left-end-on-rectangle-16-solid">Ingresa</UButton>
            <UDropdown v-if="loggedIn" :items="items" class="capitalize" :popper="{ placement: 'bottom-end' }">
              <UAvatar :src="userData.imageUrl" :alt="userFullname" />
            </UDropdown>
          </div>
          <div class="md:hidden flex-1 text-right">
            <UIcon name="i-heroicons-bars-3-16-solid" class="cursor-pointer size-8"  @click="mobileBurgerActive = !mobileBurgerActive"/>
          </div>
          
        </div>
      </UContainer>
    </div>
    <div v-if="mobileBurgerActive" class="bg-[#440d39f5] fixed top-0 left-0 h-screen w-screen z-[100000]">
      <div class="absolute top-0 right-0 p-5 cursor-pointer" @click="mobileBurgerActive = !mobileBurgerActive">
        <UIcon name="i-heroicons-x-mark" class="size-8"/>
      </div>
      <div class="flex flex-col items-center justify-center space-y-5 h-full text-xl font-oswald uppercase">
        <NuxtLink to="/" class="mb-5">
          <img src="/img/incidir-para-existir-logo.png" alt="Incidir para existir" class="h-[80px] w-auto mr-auto md:ml-0 md:mr-auto" >
        </NuxtLink>
        <NuxtLink to="/" active-class="text-mindaro" class="navbar-item" @click="mobileBurgerActive = !mobileBurgerActive">Inicio</NuxtLink>
        <NuxtLink to="/quienes-somos" active-class="text-mindaro" class="navbar-item" @click="mobileBurgerActive = !mobileBurgerActive">¿Quienes Somos?</NuxtLink>
        <NuxtLink to="/iniciativas" active-class="text-mindaro" class="navbar-item" @click="mobileBurgerActive = !mobileBurgerActive">Iniciativas</NuxtLink>
        <NuxtLink to="/desafios" active-class="text-mindaro" class="navbar-item" @click="mobileBurgerActive = !mobileBurgerActive">Desafíos</NuxtLink>
        <NuxtLink to="/actualidad" active-class="text-mindaro" class="navbar-item" @click="mobileBurgerActive = !mobileBurgerActive">Actualidad</NuxtLink>
        <UButton to="/contacto" color="mindaro" :ui="{ rounded: 'rounded-full' }" class="capitalize" @click="mobileBurgerActive = !mobileBurgerActive">Contactanos</UButton>
        <UButton v-if="!loggedIn" to="/login"  @click="mobileBurgerActive = !mobileBurgerActive" color="orange" variant="solid" :ui="{ rounded: 'rounded-full' }" icon="i-heroicons-arrow-left-end-on-rectangle-16-solid">Ingresa</UButton>
        <UDropdown v-if="loggedIn" :items="items" class="capitalize" :popper="{ placement: 'bottom-end' }">
          <UAvatar :src="userData.imageUrl" :alt="userFullname" />
        </UDropdown>
      </div>
    </div>
  </nav>
</template>