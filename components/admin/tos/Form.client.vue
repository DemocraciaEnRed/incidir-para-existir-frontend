<script setup>
const { $api } = useNuxtApp()
const toast = useToast()

const props = defineProps({
  existingData: {
    type: [String, null],
    default: () => null,
  },
  refresh: {
    type: Function,
    required: true,
  }
})

const submitLoading = ref(false)
const textEditor = useTemplateRef('theEditor')
const previousContentIfExists = props.existingData ? props.existingData : undefined

const handleSubmit = async () => {
  try {
    const contentHtml = textEditor.value.getHTML()

    await $api(`/utils/configs`, {
      method: 'PUT',
      body: {
        key: 'tos',
        value: contentHtml
      }
    })
    // await props.refresh()
    toast.add({ title: 'Términos y condiciones actualizado', description: 'El texto ha sido actualizado exitosamente', color: 'green'})
  } catch (error) {
    console.log('Error', error)
    toast.add({ title: 'Error', description: `Ha ocurrido un error al intentar editar los términos y condiciones`, color: 'red'})
  } finally {
    submitLoading.value = false
  }
}
</script>

<template>
  <div class="space-y-4">
    <UFormGroup >
      <TextEditor ref="theEditor" :content="previousContentIfExists" />
    </UFormGroup>
    <UFormGroup>
      <UButton type="submit" block class="text-xl font-semibold" color="pumpkin" :ui="{ rounded: 'rounded-full' }" :loading="submitLoading" @click="handleSubmit">Guardar</UButton>
    </UFormGroup>
  </div>

</template>