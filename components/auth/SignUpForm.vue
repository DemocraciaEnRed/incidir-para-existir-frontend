<script setup >
import {
  object as YupObject,
  string as YupString,
  // number as YupNumber,
  ref as YupRef,
} from 'yup'

const { $api } = useNuxtApp()

const props = defineProps({
  cities: {
    type: Array,
    required: true,
    default: () => ([]),
  },
});

const schema = YupObject({
  firstName: YupString().label('Nombre').required('Este campo es requerido'),
  lastName: YupString().label('Apellido').required('Este campo es requerido'),
  email: YupString().label('Email').email('Por favor, ingresa un email válido').required('Este campo es requerido'),
  password: YupString().label('Contraseña').min(6, 'La contraseña debe tener al menos 6 caracteres').required('Este campo es requerido'),
  passwordConfirmation: YupString().label('Confirmar Contraseña').oneOf([YupRef('password'), null], 'Las contraseñas deben coincidir').required('Este campo es requerido'),
  city: YupObject().required('Este campo es requerido'),
  // subdivision: YupObject().notRequired(),
  subdivision: YupObject().label('Subdivisión').when('city', {
    is: (city) =>  city && (city.id === 1 || city.id === 2),
    then: (schema) => schema.required('Por favor, selecciona tu localidad dentro de la ciudad seleccionada'),
    otherwise: (schema) => schema.notRequired()
  })
})


const { cities } = props;

const successfulSignUp = ref(false)
const showFormErrorsAlert = ref(false)
const isLoading = ref(false)

const state = reactive({
  firstName: null,
  lastName: null,
  email: null,
  password: null,
  passwordConfirmation: null,
  city: undefined,
  subdivision: undefined,
})

const citiesOptions = computed(() => {
  const noCityOption = {
    id: null,
    name: "No vivo en Cali o Bogotá",
    subdivisions: []
  } 
  return [noCityOption, ...cities]
})

const subdivisionsOptions = computed(() => {
  if(!state.city) return []
  if(state.city && state.city.id === null) return []
  return state.city.subdivisions
})

watch(() => state.city, (newValue, oldValue) => {
  if(newValue != oldValue) {
    state.subdivision = undefined
  }
})

async function onSubmit() {
  isLoading.value = true
  showFormErrorsAlert.value = false
  // Do something with data
  const payload = {
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
    password: state.password,
  }

  // if city is not Cali or Bogotá
  if(state.city && (state.city.id === 1 || state.city.id === 2)) {
    payload.subdivisionId = state.subdivision.id
  }


  try {
    await $api('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    })

    successfulSignUp.value = true
    isLoading.value = false
  } catch (error) {
    showFormErrorsAlert.value = true
    isLoading.value = false
    console.error(error)
  }
}

function onError() {
  showFormErrorsAlert.value = true
}

function closeTheButton() {
  showFormErrorsAlert.value = false
}

</script>

<template>
  <UAlert
    v-if="showFormErrorsAlert"
    icon="i-heroicons-exclamation-triangle"
    color="red"
    variant="subtle"
    :close-button="{ 
      icon: 'i-heroicons-x-mark-20-solid',
      padded: false,
      color: 'red',
      variant: 'link',
      onClick: closeTheButton
    }"
    class="mb-5"
    title="Hay algunos errores en el formulario">
    <template #description>
      <p>Por favor, verifique los campos y vuelva a intentarlo</p>
    </template>
  </UAlert>
  <UCard v-if="successfulSignUp" class="text-center space-y-3">
    <UIcon name="i-heroicons-check-circle" class="text-6xl text-green-500" />
    <p class="text-green-500 font-oswald uppercase text-3xl mb-3">¡Registro exitoso!</p>
    <p>Recibiras un correo a <span class="font-mono text-pumpkin-500 font-medium">{{ state.email }}</span> para confirmar tu cuenta.</p>
  </UCard>
  <UCard v-else>
    <template #default>
      <div class="space-y-4">
          <UForm ref="theForm" :schema="schema" :state="state" class="space-y-4" @error="onError" @submit.prevent="onSubmit">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- firstName -->
              <UFormGroup class="" label="Nombre" name="firstName" required>
                <UInput v-model="state.firstName" size="lg" placeholder="Escribe aquí..." />
              </UFormGroup>
              <!-- lastName -->
              <UFormGroup class="" label="Apellido" name="lastName" required>
                <UInput v-model="state.lastName" size="lg" placeholder="Escribe aquí..." />
              </UFormGroup>
            </div>
            <!-- email -->
            <UFormGroup class="" label="Email" name="email" required>
              <UInput v-model="state.email" size="lg" icon="i-heroicons-envelope" placeholder="Escribe tu email aquí..." />
            </UFormGroup>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- password -->
              <UFormGroup class="" label="Contraseña" name="password" required >
                <UInput v-model="state.password" size="lg" type="password" placeholder="Escribe tu contraseña aquí..." />
              </UFormGroup>
              <!-- passwordConfirmation -->
              <UFormGroup class="" label="Confirmar Contraseña" name="passwordConfirmation" required >
                <UInput v-model="state.passwordConfirmation" size="lg" type="password" placeholder="Confirma tu contraseña aquí..."  />
              </UFormGroup>
            </div>
            <!-- city -->
            <UFormGroup label="Seleccione tu ciudad" name="city" required>
              <USelectMenu v-model="state.city" :options="citiesOptions" option-attribute="name" placeholder="Elige una opción" size="lg" :ui-menu="{ container: 'z-[1500] group' }"/>
            </UFormGroup>
            <UFormGroup v-if="state.city && state.city.id != null" class="" label="Seleccioná tu corregimiento, comuna o localidad" name="subdivision" required>
              <USelectMenu v-model="state.subdivision" :options="subdivisionsOptions" size="lg" :ui-menu="{ container: 'z-[1500] group' }">
                <template #option="{ option }">
                  <span>{{ option.type }} {{ option.name }}</span>
                </template>
                <template #label>
                  <span v-if="state.subdivision">{{ state.subdivision.type }} {{ state.subdivision.name }}</span>
                  <span v-else>Elige una opción</span>
                </template>
              </USelectMenu>
            </UFormGroup>
            <div class="flex justify-end">
              <UButton variant="soft" size="xl" class="text-xl" block trailing :ui="{ rounded: 'rounded-full' }" type="submit" :loading="isLoading" :disabled="isLoading">{{ isLoading ? 'Cargando...' : 'Registrarme' }}</UButton>
            </div>
          </UForm>
      </div>
    </template>
  </UCard>
</template>
