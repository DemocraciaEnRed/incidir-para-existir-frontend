<script setup>
  import { QuienesSomosProfileModal } from '#components';
  import { ref, onMounted } from 'vue'

  const { $api } = useNuxtApp()

  const props = defineProps({
    team: {
      type: String,
      default: () => null
    },
    type: {
      type: String,
      default: () => null
    }
  })

  const modal = useModal()
  const toast = useToast()
  const isLoading = ref(true)
  const members = ref([])

  onMounted(() => {
    getMembers()
  })

  const getMembers = async () => {
    try {
      const dataResponse = await $api('/members/all', {
        method: 'GET',
        query: {
          team: props.team
        }
      })
      console.log(dataResponse)
      members.value = dataResponse
      isLoading.value = false
    } catch (error) {
      toast.add({title: 'Error', description: 'Ocurrió un error al cargar los miembros', color: 'red'})
      console.error(error)

    }
  }

  const openModalMember = (member) => {
    modal.open(QuienesSomosProfileModal, {
      member: member,
      onCloseModal: () => {
        modal.close()
      }
    })
  }

  const getMemberImageUrl = (imageUrl) => {
    return imageUrl ? imageUrl : '/img/member-default.png'
  }

  const avatarBorderType = computed(() => {
    if(props.team && props.team == 'movilizatorio'){
      return 'rounded-full'
    }
    return 'rounded-3xl'
  })

</script>

<template>
  <div>
  <LoadingBar v-if="isLoading" class="text-white py-8"/>
  <div v-else>
    <div v-if="members.length == 0" class="my-10">
      <p class="text-left text-white italic">No hay miembros para listar</p>
    </div>
    <UCarousel
      v-else
      v-slot="{ item }" 
      :items="members"
      :ui="{ item: 'snap-start basis-full md:basis-1/2 lg:basis-1/4' }"     
      :prev-button="{ color: 'gray', icon: 'i-heroicons-arrow-left-20-solid', size: 'xl', class: 'lg:-start-12' }"
      :next-button="{ color: 'gray', icon: 'i-heroicons-arrow-right-20-solid', size: 'xl', class: 'lg:-end-12' }" 
      arrows 
      >
      <div class="w-full p-4">
        <img :src="getMemberImageUrl(item.imageUrl)" class="w-2/3 mx-auto md:w-full cursor-pointer" :class="avatarBorderType" draggable="false" @click="openModalMember(item)">
        <p class="font-semibold text-center text-xl mt-2 cursor-pointer" @click="openModalMember(item)">
          {{item.fullname}}
        </p>
      </div>
    </UCarousel>
  </div>
  </div>
</template>
