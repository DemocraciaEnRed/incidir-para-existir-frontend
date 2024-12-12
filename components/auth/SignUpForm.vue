<script setup >
import Joi from 'joi'

const { $api } = useNuxtApp()

const props = defineProps({
  subdivisions: {
    type: Array,
    required: true,
    default: () => ([]),
  },
});

const schema = Joi.object({
  firstName: Joi.string().label('Nombre').required(),
  lastName: Joi.string().label('Apellido').required(),
  email: Joi.string().label('Email').required(),
  password: Joi.string().label('Password').required(),
  passwordConfirmation: Joi.ref("password"),
  selectedCity: Joi.number().required(),
  selectedSubdivision: Joi.optional().when('selectedCity', {  
    is: Joi.number().valid(1, 2),
    then: Joi.required(),
    otherwise: Joi.optional()
  })
}).with('password', 'passwordConfirmation')


const { subdivisions } = props;

const getRandomInt = function(max) {
  return Math.floor(Math.random() * max);
}
const successfulSignUp = ref(false)
const isLoading = ref(false)

const state = reactive({
  firstName: 'Guillermo',
  lastName: 'Croppi',
  email: `guillermocroppi${getRandomInt(400)}@gmail.com`,
  password: '123456',
  passwordConfirmation: '123456',
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

async function onSubmit(event) {
  // Do something with data
  console.log(event.data)
  const payload = {
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
    password: state.password,
  }
  if(state.selectedCity >= 1 || state.selectedCity <= 2) {
    payload.subdivision = state.selectedSubdivision
  }
  console.log(payload)
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

async function onError(event) {
  console.error(event)
  const theForm = useTemplateRef('theForm')
  console.log(theForm)
  theForm.validate();

}

</script>

<template>
  <UCard v-if="successfulSignUp" class="text-center space-y-3">
    <UIcon name="i-heroicons-check-circle" class="text-6xl text-green-500" />
    <p class="text-green-500 font-oswald uppercase text-3xl mb-3">¡Registro exitoso!</p>
    <p>Recibiras un correo a <span class="font-mono text-pumpkin-500 font-medium">{{ state.email }}</span> para confirmar tu cuenta.</p>
  </UCard>
  <UCard v-else>
    <template #default>
      <div class="space-y-4">
          <UForm ref="theForm" :schema="schema" :state="state" class="space-y-4" :validate-on="['blur']" @error="onError" @submit.prevent="onSubmit">
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
              <UFormGroup class="" label="Password" name="password" required >
                <UInput v-model="state.password" size="lg" type="password"  />
              </UFormGroup>
              <!-- passwordConfirmation -->
              <UFormGroup class="" label="Confirmar Password" name="passwordConfirmation" required >
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
