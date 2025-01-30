<script setup>
import {
  string as YupString,
  object as YupObject
} from 'yup'

const toast = useToast()

const stateSchema = YupObject({
  name: YupString().required('Este campo es requerido'),
})

const state = reactive({
  name: '',
})


const emit = defineEmits(['closeModal', 'submit'])

function closeModal() {
  emit('closeModal')
}

function handleSubmit() {
  if (!state.name) {
    toast.add({ title: 'Error', description: '', color: 'red' })
    return
  }

  emit('submit', state.name)
}
</script>

<template>
  <UModal>
    <UCard>
      <div class="space-y-2">
        <h1 class="font-oswald uppercase text-2xl mb-2">Crear categoria</h1>
        <p>Aquí puede crear una nueva categoria, para eso solo debe escribir el nombre de la categoria y presionar el botón de crear.</p>
        <UForm :state="state" :schema="stateSchema" class="space-y-4" @submit="handleSubmit">
          <UFormGroup name="name" label="Nuevo Nombre">
            <UInput v-model="state.name" placeholder="Escriba aquí..." />
          </UFormGroup>
          <div class="flex flex-row justify-between align-middle">
            <UButton type="button" variant="outline" color="white" @click="closeModal">
              Cerrar
            </UButton>
            <UButton type="submit" color="pumpkin" @click="submit">
              Crear
            </UButton>
          </div>
        </UForm>
      </div>
    </UCard>
  </UModal>
</template>