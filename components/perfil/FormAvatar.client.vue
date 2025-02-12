<script setup>

const { $api } = useNuxtApp()
const { data: userData, getSession } = useAuth()
const toast = useToast()

const pictureResult = ref({})
const enableUploadPicture = ref(true)
const alreadyHasPicture = ref(false)
const submitLoading = ref(false)

if(userData.value.imageUrl){
  enableUploadPicture.value = false
  alreadyHasPicture.value = true
} else {
  enableUploadPicture.value = true
  alreadyHasPicture.value = false
}


const handleSubmit = async () => {
  try {
    const formData = new FormData()

    if(pictureResult.value.dataURL) {
      // create a file from the pictureResult.dataURL
      const theExtension = pictureResult.value.dataURL.split(';')[0].split('/')[1]
      const blob = await fetch(pictureResult.value.blobURL).then(r => r.blob());
      formData.append('picture', blob, `picture.${theExtension}`)
    }

    submitLoading.value = true
    await $api(`/users/avatar`, {
      method: 'POST',
      body: formData,
    });
    toast.add({ title: 'Avatar actualizado', description: 'El avatar ha sido actualizado exitosamente', color: 'green' });
    await getSession();
    navigateTo('/perfil')
  } catch (error) {
    console.log('Error', error)
    toast.add({ title: 'Error', description: 'Hubo un error al actualizar el avatar', color: 'red' })
  } finally {
    submitLoading.value = false
  }
}

const setPictureResult = async (cropperResult) => {
  // cropperREsult has dataUrl, blobUrl, file
  pictureResult.value = cropperResult
  // check if empty object or null
  if(Object.keys(cropperResult).length === 0 && cropperResult.constructor === Object){
    if(userData.value.imageUrl){
      enableUploadPicture.value = false
      alreadyHasPicture.value = true
    } else {
      enableUploadPicture.value = true
      alreadyHasPicture.value = false
    }
  }
}


</script>

<template>
  <UCard>
    <div class="space-y-4">
      <UFormGroup v-if="enableUploadPicture" label="Foto de perfil">
        <template #description>
          <p class="text-xs">La imagen debe ser cuadrada. Se abrirá un modal para que pueda ajustar la imagen</p>
        </template>
        <img v-if="pictureResult && pictureResult.dataURL" :src="pictureResult.dataURL" alt="Imagen de perfil" class="border border-gray-700 rounded-xl my-2 max-w-[200px]" >
        <UploadPicture :aspect-ratio="1/1" :image-height="500" :image-width="500" @set-picture="setPictureResult" />
      </UFormGroup>
      <UFormGroup v-else label="Foto de perfil">
        <img v-if="alreadyHasPicture" :src="userData.imageUrl" alt="Imagen de perfil" class="border border-gray-700 rounded-xl max-w-[200px]" >
        <p class="text-xs my-2 text-gray-500">Imagen de perfil actual, si desea cambiarla, haga clic en el botón de abajo</p>
        <UButton size="xs" variant="outline" color="red" @click="enableUploadPicture = true">Cambiar foto</UButton>
      </UFormGroup>
      <UButton block class="text-xl font-semibold" color="pumpkin" :ui="{ rounded: 'rounded-full' }" :loading="submitLoading" :disabled="!pictureResult.dataURL && !submitLoading" @click="handleSubmit">Guardar</UButton>
    </div>
  </UCard>
</template>