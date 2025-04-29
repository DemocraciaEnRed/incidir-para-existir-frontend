<script setup>

import { RecaptchaModal } from '#components'

const { $api } = useNuxtApp()
const { gtag } = useGtag()

const modal = useModal()
const toast = useToast()

const recaptchaResponse = ref(null)
const isLoading = ref(false)

const startRecaptchaChallenge = async () => {
  modal.open(RecaptchaModal, {
    onSubmitRecaptcha: (response) => {
      recaptchaResponse.value = response 
      handleSubmit()
      modal.close()
    },
    onCloseModal: () => {
      modal.close()
    }
  })
}


const handleSubmit = async () => {
  isLoading.value = true
  try{
    // because this needs to be send with the bearer token
    const url = '/challenges/csv'
    const payload = {
      recaptchaResponse: recaptchaResponse.value
    }
    const {_data, headers } = await $api.raw(url, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    // extract from content-disposition the filename
    const filename = headers.get('content-disposition').split('filename=')[1]
    
    // download the csv
    const blob = new Blob([_data], { type: 'text/csv' })
    const urlBlob = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = urlBlob
    a.download = filename
    a.click()
    recaptchaResponse.value = null
    isLoading.value = false

    gtag('event', 'download_csv', {
      event_category: 'engagement',
      event_label: 'download_csv_challenges',
      method: 'click',
      value: 1
    });
  } catch (error) {
    console.log(error)
    toast.add({ title: 'Error', description: 'Hubo un error al descargar el CSV', color: 'red' })
    isLoading.value = false
  }
}

</script>

<template>
  <UButton color="mindaro" class="sm:text-xl font-medium" :loading="isLoading" size="lg" block icon="i-heroicons-arrow-down-tray" :ui="{ rounded: 'rounded-full' }" @click="startRecaptchaChallenge">Descargar CSV</UButton>
</template>