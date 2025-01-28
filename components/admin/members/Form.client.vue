<script setup>
import {
  object as YupObject,
  string as YupString,
} from 'yup'

const { $api } = useNuxtApp()
const toast = useToast()

const props = defineProps({
  existingMember: {
    type: [Object, null, undefined],
    default: () => null,
  },
  refresh: {
    type: Function,
    required: true,
  }
})

const memberSchema = YupObject({
  fullname: YupString().required('Este campo es requerido'),
  team: YupString().oneOf(['Cali', 'Bogotá', 'Movilizatorio' ], 'Por favor, seleccione un equipo').required('Este campo es requerido'),
  bio: YupString().min(50, 'La biografía debe tener al menos 50 caracteres').required('Este campo es requerido'),
  linkedin: YupString().url('Por favor, ingresa una URL válida'),
  twitter: YupString().url('Por favor, ingresa una URL válida'),
  instagram: YupString().url('Por favor, ingresa una URL válida'),
  tiktok: YupString().url('Por favor, ingresa una URL válida'),
})

const editMode = ref(false)
const submitLoading = ref(false)
const pictureResult = ref({})
const enableUploadPicture = ref(true)
const alreadyHasPicture = ref(false)
const teams = ['Cali', 'Bogotá', 'Movilizatorio']

const memberState = reactive({
  fullname: '',
  team: '',
  bio: '',
  linkedin: '',
  twitter: '',
  instagram: '',
  tiktok: '',
})

if(props.existingMember){
  editMode.value = true
  for(const key in memberState){
    memberState[key] = props.existingMember[key] || ''
  } 
  if(props.existingMember.imageUrl){
    enableUploadPicture.value = false
    alreadyHasPicture.value = true
  } else {
    enableUploadPicture.value = true
    alreadyHasPicture.value = false
  }
}

const handleSubmit = async () => {
  try {
    const formData = new FormData()

    // create the form data from the memberState. If the value is empty, it won't be added to the form data
    for(const key in memberState) {
      if(memberState[key]){
        formData.append(key, memberState[key])
      }
    }

    // formData.append('fullname', memberState.fullname)
    // formData.append('team', memberState.team)
    // formData.append('bio', memberState.bio)
    // formData.append('linkedin', memberState.linkedin)
    // formData.append('twitter', memberState.twitter)
    // formData.append('instagram', memberState.instagram)
    // formData.append('tiktok', memberState.tiktok)

    
    if(pictureResult.value.dataURL) {
      // create a file from the pictureResult.dataURL
      const theExtension = pictureResult.value.dataURL.split(';')[0].split('/')[1]
      const blob = await fetch(pictureResult.value.blobURL).then(r => r.blob());
      formData.append('picture', blob, `picture.${theExtension}`)
    }

    submitLoading.value = true
    if(editMode.value){
      await $api(`/members/${props.existingMember.id}`, {
        method: 'PUT',
        body: formData,
      })
      // await props.refresh()
      toast.add({ title: 'Miembro actualizado', description: 'El miembro ha sido actualizado exitosamente', color: 'green'})
    } else {
      await $api('/members', {
        method: 'POST',
        body: formData,
      })
    }

    toast.add({ title: 'Miembro creado', description: 'El miembro ha sido creado exitosamente', color: 'green'})
    navigateTo('/admin/miembros')
  } catch (error) {
    console.log('Error', error)
    toast.add({ title: 'Error', description: `Ha ocurrido un error al intentar ${editMode.value ? 'editar' : 'crear'} el miembro`, color: 'red'})
  } finally {
    submitLoading.value = false
  }
}

const setPictureResult = async (cropperResult) => {
  // cropperREsult has dataUrl, blobUrl, file
  pictureResult.value = cropperResult
}


</script>

<template>
  <UCard>
    <UForm :state="memberState" :schema="memberSchema" class="space-y-4" @submit="handleSubmit">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-8 space-y-4">
          <UFormGroup name="fullname" label="Nombre completo" required>
            <UInput v-model="memberState.fullname" placeholder="Escriba aquí..." />
          </UFormGroup>
          <UFormGroup name="team" label="Equipo" required description="Seleccione a que equipo pertenece el miembro">
            <USelect v-model="memberState.team" :options="teams" />
          </UFormGroup>
          <UFormGroup name="linkedin" label="Linkedin">
            <UInput v-model="memberState.linkedin" label="Linkedin" placeholder="https://www.linkedin.com/in/usuario" />
          </UFormGroup>
          <UFormGroup name="twitter" label="Twitter">
            <UInput v-model="memberState.twitter" label="Twitter" placeholder="https://twitter.com/usuario" />
          </UFormGroup>
          <UFormGroup name="instagram" label="Instagram">
            <UInput v-model="memberState.instagram" label="Instagram" placeholder="https://www.instagram.com/usuario" />
          </UFormGroup>
          <UFormGroup name="tiktok" label="Tiktok">
            <UInput v-model="memberState.tiktok" label="Tiktok" placeholder="https://www.tiktok.com/@usuario" />
          </UFormGroup>
        </div>
        <div class="col-span-4">
          <UFormGroup v-if="enableUploadPicture" label="Foto de perfil">
            <template #description>
              <p class="text-xs">La imagen debe ser cuadrada. Se abrirá un modal para que pueda ajustar la imagen</p>
            </template>
            <img v-if="pictureResult && pictureResult.dataURL" :src="pictureResult.dataURL" alt="Imagen de perfil" class="border border-gray-700 rounded-xl mx-auto my-2" >
            <UploadPicture :aspect-ratio="1/1" @set-picture="setPictureResult" />
          </UFormGroup>
          <UFormGroup v-else label="Foto de perfil">
            <img v-if="editMode && alreadyHasPicture" :src="props.existingMember.imageUrl" alt="Imagen de perfil" class="border border-gray-700 rounded-xl mx-auto" >
            <p class="text-xs my-2 text-gray-500">Imagen de perfil actual, si desea cambiarla, haga clic en el botón de abajo</p>
            <UButton size="xs" variant="outline" color="red" @click="enableUploadPicture = true">Cambiar foto</UButton>
          </UFormGroup>
        </div>
      </div>
      <UFormGroup name="bio" label="Acerca de" required>
        <UTextarea v-model="memberState.bio" autoresize :maxrows="10" placeholder="Escriba aquí..." />
      </UFormGroup>
      <UButton type="submit" block class="text-xl font-semibold" color="pumpkin" :ui="{ rounded: 'rounded-full' }" :loading="submitLoading">Guardar</UButton>
    </UForm>
  </UCard>
</template>