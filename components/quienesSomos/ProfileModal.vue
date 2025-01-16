<script setup>
const props = defineProps({
  member: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['closeModal'])
const { member } = props

const getMemberImageUrl = (imageUrl) => {
  return imageUrl ? imageUrl : '/img/member-default.png'
}

const closeModal = () => {
  emit('closeModal')
}

</script>

<template>
  <UModal :ui="{width: 'w-full sm:w-2/3 sm:max-w-[800px]'}">
    <div class="flex w-full flex-col md:flex-row">
      <div class="sm:sticky sm:top-1 h-full w-full md:w-1/3">
        <img :src="getMemberImageUrl(member.imageUrl)" class="w-full rounded-br-xl rounded-tl-xl" draggable="false">
        <div class="p-2">
          <div class="flex justify-center text-3xl gap-3 my-5">
            <UButton v-if="member.instagram" :to="member.instagram" target="_blank" color="mindaro" icon="i-fa6-brands-instagram" size="lg" class="px-3 rounded-full" />
            <UButton v-if="member.facebook" :to="member.facebook" target="_blank" color="mindaro" icon="i-fa6-brands-facebook" size="lg" class="px-3 rounded-full" />
            <UButton v-if="member.twitter" :to="member.twitter" target="_blank" color="mindaro" icon="i-fa6-brands-twitter" size="lg" class="px-3 rounded-full" />
            <UButton v-if="member.linkedin" :to="member.linkedin" target="_blank" color="mindaro" icon="i-fa6-brands-linkedin" size="lg" class="px-3 rounded-full" />
          </div>
          <!-- close button -->
          <div class="flex justify-center">
            <UButton color="pumpkin" variant="outline" size="lg" class="px-3 text- rounded-full" @click="closeModal">
              Cerrar
            </UButton>
          </div>  
        </div>
      </div>
      <div class="w-full md:w-2/3 p-4 lg:p-6">
        <h3 class="font-bold text-4xl mb-2 text-mindaro">{{ member.fullname }}</h3>
        <div class="whitespace-break-spaces text-sm leading-tight text-justify">{{ member.bio }}</div>
      </div>
    </div>
  </UModal>
</template>