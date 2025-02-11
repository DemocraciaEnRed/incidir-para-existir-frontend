<script setup>
import {
  object as YupObject,
  string as YupString,
  boolean as YupBoolean,
  number as YupNumber,
} from 'yup'

import { RecaptchaModal } from '#components'

const { $api } = useNuxtApp()
const { gtag } = useGtag()


const toast = useToast()
const modal = useModal()

// form state
const submitSuccess = ref(false)
const submitError = ref(false)
const submitLoading = ref(false)
// data 
const recaptchaResponse = ref(null)

const successMessageDiv = useTemplateRef('success-message')

const schema = YupObject({
  fullname: YupString().required('Este campo es requerido'),
  email: YupString().email('Debe ser un correo válido').required('Este campo es requerido'),
  message: YupString().max(1000, 'El máximo es hasta 1000 caracteres').required('Este campo es requerido'),
  acceptsTerms: YupBoolean().oneOf([true], 'Debes aceptar los términos y condiciones')
})

const state = reactive({
  fullname: null,
  email: null,
  message: null,  
  acceptsTerms: false,
})


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
  try {
    const payload = {
      fullname: state.fullname,
      email: state.email,
      message: state.message,
      recaptchaResponse: null,
    }


    if(recaptchaResponse.value) {
      payload.recaptchaResponse = recaptchaResponse.value
    } else {
      toast.add({
        title: 'Error',
        description: 'Por favor, completa el captcha',
        color: 'red'
      })
      return
    }

    submitLoading.value = true

    await $api('/utils/contact', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    

    gtag('event', 'form_submission', {
      event_category: 'engagement',
      event_label: 'contact_form',
      value: 1
    });

    submitSuccess.value = true
    submitError.value = false
    setTimeout(() => {
      successMessageDiv.value.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  } catch (error) {
    console.error(error)
    submitError.value = true
    submitSuccess.value = false
    toast.add({
      title: 'Error',
      description: 'Hubo un error al enviar el formulario',
      color: 'red'
    })
  } finally {
    submitLoading.value = false
  }
  
}

</script>

<template>
  <UCard>
    <div v-if="!submitSuccess">
      <UForm :state="state" :schema="schema" class="space-y-4" @submit="startRecaptchaChallenge">
        <div class="grid grid-cols-2 gap-4">

          <UFormGroup class="" label="Nombre completo" name="fullname" required>
            <template #description>
              Ingrese su nombre completo
            </template>
            <UInput v-model="state.fullname" :disabled="submitLoading" />
          </UFormGroup>
        <UFormGroup class="" label="Correo electrónico" name="email" required>
          <template #description>
            Ingrese su correo electrónico
          </template>
          <UInput v-model="state.email" type="email" :disabled="submitLoading" />
        </UFormGroup>
        </div>
        <UFormGroup class="" label="Tu mensaje" name="message" required>
          <template #description>
            Dejanos un mensaje para que podamos contactarte <i class="text-pumpkin">(Máximo 1000 caracteres)</i>
          </template>
          <UTextarea v-model="state.message" :disabled="submitLoading" :autoresize="true" />
          <template #help>
            <span v-if="state.message" class="text-xs">Caracteres: {{ state.message.length }}</span>
          </template>
        </UFormGroup>
        <UFormGroup class="flex items-center" name="acceptsTerms" required>
            <UCheckbox v-model="state.acceptsTerms" :disabled="submitLoading">
              <template #label>
                Acepto los <ULink to="/acerca-de/terminos-y-condiciones" class="text-pumpkin-500">términos y condiciones</ULink>
              </template>
            </UCheckbox>
          </UFormGroup>
          <UDivider />
          <UButton class="text-xl font-medium" :loading="submitLoading" type="submit" color="pumpkin" block size="lg" :ui="{ rounded: 'rounded-full' }">Reportar</UButton>
      </UForm>
    </div>
    <div v-else ref="success-message" class="text-center">
      <UIcon name="i-heroicons-check-circle" class="text-6xl text-green-500" />
      <p class="text-green-500 font-oswald uppercase text-3xl mb-3">MENSAJE ENVIADO</p>
      <p>Gracias por contactarte con nosotros.</p>
    </div>
  </UCard>
</template>