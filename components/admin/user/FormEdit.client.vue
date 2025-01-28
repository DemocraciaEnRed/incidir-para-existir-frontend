<script setup>
import {
  object as YupObject,
  string as YupString,
} from 'yup'

const { $api } = useNuxtApp()
const toast = useToast()

const props = defineProps({
  existingUser: {
    type: [Object, null, undefined],
    default: () => null,
  },
  refresh: {
    type: Function,
    required: true,
  }
})

const userSchema = YupObject({
  firstName: YupString().required('Este campo es requerido'),
  lastName: YupString().required('Este campo es requerido'),
  email: YupString().email('Por favor, ingrese un correo válido').required('Este campo es requerido'),
  role: YupString().oneOf(['admin', 'reporter'], 'Por favor, seleccione un rol').required('Este campo es requerido'),
})

const submitLoading = ref(false)
const roles = [
  { label: 'Administrador', value: 'admin' },
  { label: 'Reportero', value: 'reporter' },
]

const userState = reactive({
  firstName: '',
  lastName: '',
  email: '',
  role: 'reporter',
})
const userSubdivision = ref(null)

if(props.existingUser){
  console.log('props.existingUser', props.existingUser)
  for(const key in userState){
    userState[key] = props.existingUser[key] || ''
  }
  if(props.existingUser.subdivision){
    userSubdivision.value = props.existingUser.subdivision
  }
}

const handleSubmit = async () => {
  try {
    submitLoading.value = true
    const payload = {
      ...userState,
      subdivisionId: userSubdivision.value?.id
    }
    await $api(`/user/${props.existingUser.id}`, {
      method: 'PUT',
      body: payload
    })

    toast.add({ title: 'Usuario editado', description: 'El usuario ha sido editado exitosamente', color: 'green'})
    navigateTo('/admin/users')
  } catch (error) {
    console.log('Error', error)
    toast.add({ title: 'Error', description: `Ha ocurrido un error al intentar crear el usuario`, color: 'red'})
  } finally {
    submitLoading.value = false
  }
}

const onError = (event) => {
  console.log('event', event)
  toast.add({ title: 'Error', description: event.errors[0].message, color: 'red'})
  const element = document.getElementById(event.errors[0].id)
  element?.focus()
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

</script>

<template>
 <UForm :state="userState" :schema="userSchema" class="space-y-4" @submit="handleSubmit" @error="onError">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-4">
        <UFormGroup name="firstName" label="Nombre" required>
          <UInput v-model="userState.firstName" placeholder="Escriba aquí..." />
        </UFormGroup>
      </div>
      <div class="col-span-12 lg:col-span-4">
        <UFormGroup name="lastName" label="Apellido" required>
          <UInput v-model="userState.lastName" placeholder="Escriba aquí..." />
        </UFormGroup>
      </div>
      <div class="col-span-12 lg:col-span-4">
        <UFormGroup name="role" label="Rol" required>
          <USelect v-model="userState.role" :options="roles" />
        </UFormGroup>
      </div>
    </div>
    <UFormGroup name="email" label="Correo" required>
      <UInput v-model="userState.email" type="email" placeholder="Escriba aquí..." />
    </UFormGroup>
    <UFormGroup label="Subdivisión" description="Opcional. Deje el campo vacio si no quiere definir localidad">
      <AdminSubdivisionSelector v-model="userSubdivision" />
    </UFormGroup>
    <UButton type="submit" block class="text-xl font-semibold" color="pumpkin" :ui="{ rounded: 'rounded-full' }" :loading="submitLoading">Guardar</UButton>
  </UForm>
</template>