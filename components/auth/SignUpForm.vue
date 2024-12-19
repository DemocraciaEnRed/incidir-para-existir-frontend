<script setup >
import {
  object as YupObject,
  string as YupString,
  number as YupNumber,
  ref as YupRef,
} from 'yup'

const { $api } = useNuxtApp()

const props = defineProps({
  subdivisions: {
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
  selectedCity: YupNumber().label('Ciudad').oneOf([1, 2, 99], 'Por favor, selecciona tu ciudad').required('Este campo es requerido'),
  selectedSubdivision: YupNumber().label('Subdivisión').when('selectedCity', {
    is: 1,
    then: (schema) => schema.required('Por favor, selecciona tu corregimiento')
  }).when('selectedCity', {
    is: 2,
    then: (schema) => schema.required('Por favor, selecciona tu comuna')
  })
})


const { subdivisions } = props;

const successfulSignUp = ref(false)
const showFormErrorsAlert = ref(false)
const isLoading = ref(false)

const state = reactive({
  firstName: null,
  lastName: null,
  email: null,
  password: null,
  passwordConfirmation: null,
  selectedCity: undefined,
  selectedSubdivision: undefined,
})

const citiesOptions = computed(() => {
  const noCityOption = {
    id: 99,
    name: "No vivo en Cali o Bogotá",
  }
  const cities = []
  if(!subdivisions) return [noCityOption]
  subdivisions.forEach(subdivision => {
    // check if city is already in the list
    const city = cities.find(city => city.id === subdivision.city.id)
    if(!city) {
      cities.push(subdivision.city)
    }
  })
  return [noCityOption, ...cities]
})

const subdivisionsOptions = computed(() => {
  if(!state.selectedCity) return []
  // filtered subdivisions
  const filteredSubdivisions = subdivisions.filter(subdivision => {
    if(!state.selectedCity) return true
    return subdivision.city.id === state.selectedCity
  })
  return filteredSubdivisions

})

const selectedLabelSubdivisions = computed(() => {
  if(state.selectedCity === 1) return "Cali: Selecciona tu corregimiento"
  if(state.selectedCity === 2) return "Bogota: Selecciona tu comuna"
  return '-'
})

const selectedPlaceholderSubdivisions = computed(() => {
  if(state.selectedCity === 1) return "- Selecciona tu corregimiento -"
  if(state.selectedCity === 2) return "- Selecciona tu comuna -"
  return '-'
})

const showSelectSubdivision = computed(() => {
  return state.selectedCity && state.selectedCity !== 99
})

watch(() => state.selectedCity, (newValue, oldValue) => {
  if(newValue != oldValue) {
    state.selectedSubdivision = undefined
  }
})

async function onSubmit() {
  // Do something with data
  const payload = {
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
    password: state.password,
  }

  // if city is not Cali or Bogota
  if(state.selectedCity >= 1 || state.selectedCity <= 2) {
    payload.subdivisionId = state.selectedSubdivision
  }

  isLoading.value = true

  try {
    await $api('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    })

    successfulSignUp.value = true
    isLoading.value = false
  } catch (error) {
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
            <div class="grid grid-cols-2 gap-3">
              <!-- firstName -->
              <UFormGroup class="" label="Nombre" name="firstName" required>
                <UInput v-model="state.firstName" size="lg" />
              </UFormGroup>
              <!-- lastName -->
              <UFormGroup class="" label="Apellido" name="lastName" required>
                <UInput v-model="state.lastName" size="lg" />
              </UFormGroup>
            </div>
            <!-- email -->
            <UFormGroup class="" label="Email" name="email" required>
              <UInput v-model="state.email" size="lg" icon="i-heroicons-envelope" />
            </UFormGroup>
            <div class="grid grid-cols-2 gap-3">
              <!-- password -->
              <UFormGroup class="" label="Contraseña" name="password" required >
                <UInput v-model="state.password" size="lg" type="password"  />
              </UFormGroup>
              <!-- passwordConfirmation -->
              <UFormGroup class="" label="Confirmar Contraseña" name="passwordConfirmation" required >
                <UInput v-model="state.passwordConfirmation" size="lg" type="password"  />
              </UFormGroup>
            </div>
            <!-- city -->
            <UFormGroup class="" label="Selecciońa tu ciudad" name="selectedCity" required>
              <USelectMenu v-model="state.selectedCity" size="lg" :options="citiesOptions" value-attribute="id" option-attribute="name" placeholder="- Por favor, seleccione su ciudad -">
                <template #option="{ option: city }">
                  <span>{{city.name}}</span>
                </template>
              </USelectMenu>
            </UFormGroup>
            <!-- subdivision -->
            <UFormGroup v-if="showSelectSubdivision" class="" :label="selectedLabelSubdivisions"  name="selectedSubdivision">
              <USelectMenu v-model="state.selectedSubdivision" size="lg" :options="subdivisionsOptions" value-attribute="id" option-attribute="name" :placeholder="selectedPlaceholderSubdivisions">
                <template #option="{ option: subdivision }">
                  <!-- <span>{{subdivision.city.name}} - {{subdivision.type}} "{{ subdivision.name }}"</span> -->
                  <span>{{ subdivision.name }}</span>
                </template>
              </USelectMenu>
            </UFormGroup>
            <div class="flex justify-end">
              <UButton color="pumpkin" size="lg" block type="submit" :loading="isLoading" :disabled="isLoading">{{ isLoading ? 'Cargando...' : 'Registrarme' }}</UButton>
            </div>
          </UForm>
      </div>
    </template>
  </UCard>
</template>
