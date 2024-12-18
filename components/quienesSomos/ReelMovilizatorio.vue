<script setup>

  const props = defineProps({
    members: {
      type: Array,
      required: true,
      default: () => ([]),
    },
  });
const { members } = props;

const theName = ref('')
const theImage = ref('')
const theBio = ref('')
const theInstagram = ref('')
const theFacebook = ref('')
const theTwitter = ref('')
const theLinkedin = ref('')
const isModalOpen = ref(false)

const openModal = (item) => {
  theName.value = item.nombre
  theImage.value = item.image
  theBio.value = item.biografia
  theInstagram.value = item.instagram
  theFacebook.value = item.facebook
  theTwitter.value = item.twitter
  theLinkedin.value = item.linkedin
  isModalOpen.value = true
}

</script>

<template>
  <div>
    <UCarousel
      v-slot="{ item }" 
      :items="members"
      :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/4' }"     
      :prev-button="{ color: 'gray', icon: 'i-heroicons-arrow-left-20-solid', size: 'xl', class: 'lg:-start-12' }"
      :next-button="{ color: 'gray', icon: 'i-heroicons-arrow-right-20-solid', size: 'xl', class: 'lg:-end-12' }" 
      arrows 
    >
      <div class="w-full p-4">
        <img :src="item.image" class="w-2/3 mx-auto md:w-full rounded-full cursor-pointer" draggable="false" @click="openModal(item)">
        <p class="font-semibold text-center text-xl mt-2 cursor-pointer" @click="openModal(item)">
        {{ item.nombre }}
      </p>
      </div>
    </UCarousel>
    <UModal v-model="isModalOpen" :ui="{container: 'rounded-xl items-center', width: 'w-full sm:w-2/3 md:w-1/2 sm:max-w-none', height: 'h-full sm:h-1/2 sm:max-h-none'}">
      <div class="flex w-full flex-col md:flex-row">
        <div class="w-full md:w-1/3">
          <img :src="theImage" class="w-full rounded-br-xl rounded-tl-xl" draggable="false">
          <div class="p-2">
            <div class="flex justify-center text-3xl gap-3 my-5">
              <UButton v-if="theInstagram" :to="theInstagram" target="_blank" color="mindaro" icon="i-fa6-brands-instagram" size="lg" class="px-3 rounded-full" />
              <UButton v-if="theFacebook" :to="theFacebook" target="_blank" color="mindaro" icon="i-fa6-brands-facebook" size="lg" class="px-3 rounded-full" />
              <UButton v-if="theTwitter" :to="theTwitter" target="_blank" color="mindaro" icon="i-fa6-brands-twitter" size="lg" class="px-3 rounded-full" />
              <UButton v-if="theLinkedin" :to="theLinkedin" target="_blank" color="mindaro" icon="i-fa6-brands-linkedin" size="lg" class="px-3 rounded-full" />
            </div>
            <!-- close button -->
            <div class="flex justify-center">
              <UButton color="pumpkin" variant="outline" size="lg" class="px-3 rounded-full" @click="isModalOpen = false">
                Cerrar
              </UButton>
            </div>  
          </div>
        </div>
        <div class="w-full md:w-2/3 p-4 lg:p-6">
          <h3 class="font-bold text-4xl mb-2 text-mindaro">{{ theName }}</h3>
          <p>{{ theBio }}</p>
        </div>
      </div>
    </UModal>
  </div>
</template>
