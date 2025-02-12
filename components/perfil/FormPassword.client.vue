<script setup>
import {
  object as YupObject,
  string as YupString,
  ref as YupRef,
} from 'yup'

const { $api } = useNuxtApp()

const toast = useToast()


const schema = YupObject({
  oldPassword: YupString().label('Contraseña Actual').min(6, 'La contraseña debe tener al menos 6 caracteres').required('Este campo es requerido'),
  password: YupString().label('Contraseña').min(6, 'La contraseña debe tener al menos 6 caracteres').required('Este campo es requerido'),
  passwordConfirmation: YupString().label('Confirmar Contraseña').oneOf([YupRef('password'), null], 'Las contraseñas deben coincidir').required('Este campo es requerido'),
})


const submitLoading = ref(false)

const state = reactive({
  oldPassword: null,
  password: null,
  passwordConfirmation: null,
})


const handleSubmit = async () => {
  try {
    submitLoading.value = true

    const payload = {
      oldPassword: state.oldPassword,
      newPassword: state.password,
    };
    await $api(`/users/password/update`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    toast.add({ title: 'Contraseña actualizada', description: 'La contraseña ha sido actualizada exitosamente', color: 'green' });
    navigateTo('/perfil')
  } catch (error) {
    console.log('Error', error)
    toast.add({ title: 'Error', description: 'Hubo un error al actualizar la contraseña', color: 'red' })
  } finally {
    submitLoading.value = false
  }
}

</script>

<template>
  <UCard class="max-w-[400px]">
    <UForm :state="state" :schema="schema" class="space-y-6" @submit="handleSubmit">
      <UFormGroup name="oldPassword" label="Contraseña Actual">
        <UInput v-model="state.oldPassword" type="password" :disabled="submitLoading" />
      </UFormGroup>
      <UFormGroup name="password" label="Contraseña">
        <UInput v-model="state.password" type="password" :disabled="submitLoading" />
      </UFormGroup>
      <UFormGroup name="passwordConfirmation" label="Confirmar Contraseña">
        <UInput v-model="state.passwordConfirmation" type="password" :disabled="submitLoading" />
      </UFormGroup>
      <UButton 
        block 
        class="text-xl font-semibold" 
        color="pumpkin" 
        :ui="{ rounded: 'rounded-full' }" 
        :loading="submitLoading" 
        :disabled="submitLoading" 
        @click="handleSubmit">
        Guardar
      </UButton>
    </UForm>
  </UCard>
</template>
