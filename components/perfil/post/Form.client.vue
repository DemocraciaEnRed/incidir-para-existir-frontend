<script setup>
import slug from 'slug'

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
  slug: YupString().required('Este campo es requerido'),
  subtitle: YupString().required('Este campo es requerido'),
  category: YupObject().required('Este campo es requerido'),
})

const state = reactive({
  title: '',
  slug: '',
  subtitle: '',
  category: null,
})

const editMode = ref(false)
const submitLoading = ref(false)
const pictureResult = ref({})
const enableUploadPicture = ref(true)
const alreadyHasPicture = ref(false)
const enableSlugEdit = ref(false)
const textEditor = useTemplateRef('theEditor')
let previousContentIfExists = undefined;

if(props.existingEntry){
  editMode.value = true
  state.title = props.existingEntry.title
  state.slug = props.existingEntry.slug
  state.subtitle = props.existingEntry.subtitle
  state.category = props.existingEntry.categoryId
  previousContentIfExists = props.existingEntry.text
  if(props.existingEntry.imageUrl){
    enableUploadPicture.value = false
    alreadyHasPicture.value = true
  } else {
    enableUploadPicture.value = true
    alreadyHasPicture.value = false
  }

}

function truncateSlug(theSlug, maxLength) {
  if (theSlug.length <= maxLength) return theSlug;
  return theSlug.slice(0, maxLength).replace(/-+$/g, '').split('-').slice(0, -1).join('-');
}


const updateSlug = () => {
  let theSlug = slug(state.title, { lower: true });
  if (theSlug.length > 90) {
    theSlug = truncateSlug(theSlug, 90);
  }
  state.slug = theSlug;
}

const setPictureResult = async (cropperResult) => {
  // cropperREsult has dataUrl, blobUrl, file
  pictureResult.value = cropperResult
  // check if empty object or null
  if(Object.keys(cropperResult).length === 0 && cropperResult.constructor === Object){
    if(props.existingEntry.imageUrl){
      enableUploadPicture.value = false
      alreadyHasPicture.value = true
    } else {
      enableUploadPicture.value = true
      alreadyHasPicture.value = false
    }
  }
}

const handleSubmit = async () => {
  try {
    const formData = new FormData()
    
    formData.append('title', state.title)
    formData.append('slug', state.slug)
    formData.append('subtitle', state.subtitle)
    formData.append('categoryId', state.category.id)
    const contentHtml = textEditor.value.getHTML()
    formData.append('text', contentHtml)
    
    if(pictureResult.value.dataURL) {
      // create a file from the pictureResult.dataURL
      const theExtension = pictureResult.value.dataURL.split(';')[0].split('/')[1]
      const blob = await fetch(pictureResult.value.blobURL).then(r => r.blob());
      formData.append('picture', blob, `picture.${theExtension}`)
    }

    submitLoading.value = true
    if(editMode.value){
      await $api(`/users/posts/${props.existingEntry.id}`, {
        method: 'PUT',
        body: formData,
      })
      // await props.refresh()
      toast.add({ title: 'Exito', description: 'El posteo ha sido actualizado exitosamente', color: 'green'})
    } else {
      await $api('/users/posts', {
        method: 'POST',
        body: formData,
      })
      toast.add({ title: 'Exito', description: 'El post ha sido creado exitosamente', color: 'green'})
    }

    navigateTo('/perfil/posts')
  } catch (error) {
    console.log('Error', error)
    toast.add({ title: 'Error', description: `Ha ocurrido un error al intentar ${editMode.value ? 'editar' : 'crear'} el post`, color: 'red'})
  } finally {
    submitLoading.value = false
  }
}

const urlFinal = computed(() => {
  if(!state.slug) return null
  return `https://incidirparaexistir.democraciaenred.org/actualidad/${state.slug}`
})

</script>

<template>
  <div>
  <UForm :state="state" :schema="stateSchema" class="space-y-4" @submit="handleSubmit">
    <UFormGroup name="title" label="Titulo" required>
      <UInput v-model="state.title" size="xl" placeholder="Escriba aquí..." @blur="updateSlug" />
    </UFormGroup>
    <UFormGroup name="slug" label="Slug" :help="urlFinal" required>        
      <UInput v-model="state.slug" :disabled="!enableSlugEdit" />
      <UCheckbox v-model="enableSlugEdit" class="mt-2" label="Editar slug" />
    </UFormGroup>
    <UFormGroup name="subtitle" label="Subtitulo" help="" required>
      <UTextarea v-model="state.subtitle" autoresize placeholder="Escriba aquí..." />
    </UFormGroup>
    <div class="flex space-x-2">
      <UFormGroup name="category" label="Categoría" class="w-full" required>
        <AdminBlogCategorySelector v-model="state.category" />
      </UFormGroup>
    </div>
    <UFormGroup v-if="enableUploadPicture" label="Cover del post" >
      <template #description>
        <p class="text-xs">La imagen debe ser 16:9. Se abrirá un modal para que pueda ajustar la imagen</p>
      </template>
      <img v-if="pictureResult && pictureResult.dataURL" :src="pictureResult.dataURL" alt="Cover del posteo" class="border border-gray-700 rounded-xl mx-auto my-2" >
      <UploadPicture :aspect-ratio="16/9" :image-height="900" :image-width="1600" @set-picture="setPictureResult" />
    </UFormGroup>
    <UFormGroup v-else label="Cover del post">
      <img v-if="editMode && alreadyHasPicture" :src="props.existingEntry.imageUrl" alt="Imagen de perfil" class="border border-gray-700 rounded-xl mx-auto" >
      <p class="text-xs my-2 text-gray-500">Foto de cover actual, si desea cambiarla, haga clic en el botón de abajo</p>
      <UButton size="xs" variant="outline" color="red" @click="enableUploadPicture = true">Cambiar foto</UButton>
    </UFormGroup>
    <UFormGroup >
      <TextEditor ref="theEditor" :content="previousContentIfExists" />
    </UFormGroup>
    <UFormGroup>
      <UButton type="submit" block class="text-xl font-semibold" color="pumpkin" :ui="{ rounded: 'rounded-full' }" :loading="submitLoading">Guardar</UButton>
    </UFormGroup>
  </UForm>
</div>

</template>