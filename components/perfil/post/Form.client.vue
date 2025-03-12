<script setup>
import slug from 'slug'

import {
  object as YupObject,
  string as YupString,
} from 'yup'

const { $api } = useNuxtApp()
const toast = useToast()

const runtimeConfig = useRuntimeConfig()

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
  if(!state.slug) return `${runtimeConfig.public.fullUrl}/actualidad/`
  return `${runtimeConfig.public.fullUrl}/actualidad/${state.slug}`
})

</script>

<template>
  <div>
  <UForm :state="state" :schema="stateSchema" class="space-y-4" @submit="handleSubmit">
    <UFormGroup name="title" label="Titulo" required>
      <UInput v-model="state.title" size="xl" placeholder="Escriba aquí..." @blur="updateSlug" />
    </UFormGroup>
    <UFormGroup name="slug" label="Slug de URL" required>        
      <UInput v-model="state.slug" :disabled="!enableSlugEdit && editMode" />
      <UCheckbox v-if="!editMode" v-model="enableSlugEdit" class="mt-2" label="Editar slug manualmente" />
      <template #description>
        <div class="p-2 my-2 border border-pumpkin-800 rounded-xl">
          <p class="text-pumpkin-700 mb-2"><b>¿Que es el "slug" de un post?</b></p>
          <p class="text-xs">El slug es una parte importante de la dirección web (URL) que generalmente se genera en relación al título del post. Elegir un slug único ayuda a que sea más fácil de encontrar y evitar conflictos con otras páginas.</p>
          <p class="text-xs">El slug es la parte final de la URL que se muestra en el navegador, por ejemplo: <b>https://juventudesquetransforman.co/actualidad/</b><b class="text-pumpkin-700">este-es-el-slug</b></p>          
          <br>
          <p class="text-xs">Un buen slug es importante para la optimización en motores de búsqueda y para compartir en redes sociales y aplicaciones de mensajeria.</p>
          <br>
          <p class="text-xs">Debe ser <b>corto</b>, <b>descriptivo</b> y <b>no debe repetirse</b> dentro del sitio con otros posteos.</p>
          <p class="text-xs">Si no se especifica un slug, se <b>generará automáticamente a partir del título</b> del post.</p>
          <br>
          <!-- Consejos -->
          <p class="text-pumpkin-700 mb-2"><b>Consejos para elegir un buen slug:</b></p>
          <p class="text-xs">1. Mantenga el slug corto y relevante.</p>
          <p class="text-xs">2. Use guiones en lugar de espacios.</p>
          <p class="text-xs">3. Evite caracteres especiales y números, si es posible.</p>
          <p class="text-xs">4. No use mayúsculas.</p>
          <p class="text-xs">5. No repita slugs de otros posteos.</p>
          <p class="text-xs">6. No use palabras genéricas como "el", "la", "de", "en", "con", etc.</p>
          <p class="text-xs">7. No use palabras que no tengan relación con el contenido del post.</p>
          <br>
          <p class="text-pumpkin-700 mb-2"><b><u>IMPORTANTE</u>:<br>No se podrá cambiar el slug una vez creado el posteo, en caso de necesitar, contacta a los administradores.</b></p>
        </div>
      </template>
      <template #help>
        <p><b>URL:</b> {{ urlFinal }}</p>
      </template>
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