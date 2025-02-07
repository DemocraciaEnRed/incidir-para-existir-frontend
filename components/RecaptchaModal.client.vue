<script setup>

const { $recaptcha } = useNuxtApp()

const emit = defineEmits(['closeModal', 'submitRecaptcha'])

onMounted(() => {
  $recaptcha.render('recaptcha-widget', (response) => {
    console.log('Recaptcha response:', response)
    setTimeout(() => {
      emit('submitRecaptcha', response)
    }, 500)
  })
})


function closeModal() {
  emit('closeModal')
}

</script>

<template>
  <UModal>
    <UCard>
      <div class="space-y-2">
        <h1 class="font-oswald uppercase text-2xl mb-2">Complete el captcha</h1>
        <p>Para continuar, por favor, completa el captcha</p>
        <!-- The reCAPTCHA widget -->
        <div id="recaptcha-widget" />
        <div class="flex flex-row justify-between align-middle my-3">
          <UButton variant="outline" color="white" class="mt-2" @click="closeModal">
            Cancelar
          </UButton>
        </div>
      </div>
    </UCard>
  </UModal>
</template>