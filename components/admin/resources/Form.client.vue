<script setup>

import {
  object as YupObject,
  string as YupString,
} from 'yup'

const { $api } = useNuxtApp()
const toast = useToast()

const props = defineProps({
  existingEntry: {
    type: [Object, null, undefined],
    default: () => null,
  },
})

const stateSchema = YupObject({
  title: YupString().required('Este campo es requerido'),
  description: YupString(),
  category: YupObject().required('Este campo es requerido'),
  url: YupString().url('Por favor, ingresa una URL válida').required('Este campo es requerido'),
})

const state = reactive({
  title: '',
  description: '',
  category: null,
  url: '',
})

const editMode = ref(false)
const submitLoading = ref(false)


if(props.existingEntry){
  editMode.value = true
  state.title = props.existingEntry.title
  state.description = props.existingEntry.description
  state.category = props.existingEntry.category
  state.url = props.existingEntry.url
}


const handleSubmit = async () => {
  try {
    const payload = {
      title: state.title,
      description: state.description,
      categoryId: state.category.id,
      url: state.url,
    }

    submitLoading.value = true
    if(editMode.value){
      await $api(`/resources/${props.existingEntry.id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      })
      // await props.refresh()
      toast.add({ title: 'Enlace de interes actualizado', description: 'El enlace de interes ha sido actualizado exitosamente', color: 'green'})
    } else {
      await $api('/resources', {
        method: 'POST',
        body: JSON.stringify(payload)
      })
      toast.add({ title: 'Enlace de interes creado', description: 'El enlace de interes ha sido creado exitosamente', color: 'green'})
    }

    navigateTo('/admin/recursos')
  } catch (error) {
    console.log('Error', error)
    toast.add({ title: 'Error', description: `Ha ocurrido un error al intentar ${editMode.value ? 'editar' : 'crear'} el enlace de interes`, color: 'red'})
  } finally {
    submitLoading.value = false
  }
}
</script>

<template>
  <div>
  <UForm :state="state" :schema="stateSchema" class="space-y-4" @submit="handleSubmit">
    <UFormGroup name="title" label="Titulo y/o nombre del recurso" required>
      <UInput v-model="state.title" size="xl" placeholder="Escriba aquí..." />
    </UFormGroup>
    <UFormGroup name="category" label="Categoría" class="w-full" required>
      <AdminResourcesCategorySelector v-model="state.category" />
    </UFormGroup>
    <UFormGroup name="description" label="Descripción acerca del recurso" help="Opcional">
      <UTextarea v-model="state.description" autoresize placeholder="Escriba aquí..." />
    </UFormGroup>
    <UFormGroup name="url" label="URL del recurso">
      <UInput v-model="state.url" label="URL" placeholder="https://www.ejemplo.com/enlace" />
    </UFormGroup>
    <UFormGroup>
      <UButton type="submit" block class="text-xl font-semibold" color="pumpkin" :ui="{ rounded: 'rounded-full' }" :loading="submitLoading">Guardar</UButton>
    </UFormGroup>
  </UForm>
</div>

</template>