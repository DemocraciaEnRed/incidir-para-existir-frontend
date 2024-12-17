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
            <div class="flex justify-center text-3xl gap-3 mt-5">
              <a v-if="theInstagram" :href="theInstagram" target="_blank" class="text-pumpkin-500">
                <UIcon name="i-fa6-brands-instagram" size="lg" />
              </a>
              <a v-if="theFacebook" :href="theFacebook" target="_blank" class="text-pumpkin-500">
                <UIcon name="i-fa6-brands-instagram" size="lg" />
              </a>
              <a v-if="theTwitter" :href="theTwitter" target="_blank" class="text-pumpkin-500">
                <UIcon name="i-fa6-brands-x-twitter" size="lg" />
              </a>
              <a v-if="theLinkedin" :href="theLinkedin" target="_blank" class="text-pumpkin-500">
                <UIcon name="i-fa6-brands-linkedin" size="lg" />
              </a>
            </div>
          </div>
        </div>
        <div class="w-full md:w-2/3 p-4 lg:p-6">
          <h3 class="font-bold text-4xl mb-2">{{ theName }}</h3>
          <p>{{ theBio }}</p>
        </div>
      </div>
    </UModal>
  </div>
</template>
