<template>
  <div >
    <!-- Select a picture for cropping -->
    <section class="section">

      <!-- Set a button that invokes selecting an image -->
      <UButton v-if="!pic" @click="openFile">Seleccionar imagen</UButton>
      <UButton v-else @click="erasePicture" >Borrar</UButton>
      <input
        ref="uploadInput"
        type="file"
        class="hidden"
        :accept="accept"
        @change="selectFile"
      >
    </section>

    <!-- Crop result preview -->
    <!-- <section v-if="result.dataURL && result.blobURL" class="section">
      <p>TheDataURL</p>
      <div class="preview">
        <img :src="result.dataURL" >
      </div>
      <p>TheBlob</p>
      <div class="preview">
        <img :src="result.blobURL" >
      </div>
      <p>ThePrint</p>
    </section> -->

    <!-- A Popup for cropping -->
    <!-- You can replace it with the framework's Modal component -->
    <UModal v-model="isShowModal" >
      <UCard>
        <template #header>
          Ajuste de imagen
        </template>
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton color="white" variant="ghost" @click="isShowModal = false">Cancelar</UButton>
            <UButton color="white" variant="ghost" @click="clear">Limpiar</UButton>
            <UButton color="white" variant="ghost" @click="reset">Reset</UButton>
            <UButton color="mindaro" @click="getResult">Aceptar</UButton>
          </div>
        </template>
        <template #default>

        <div class="modal-content">
            <!-- The component imported from `vue-picture-cropper` plugin -->
            <VuePictureCropper
              :box-style="{
                width: '100%',
                height: '100%',
                backgroundColor: '#f8f8f8',
                margin: 'auto',
              }"
              :img="pic"
              :options="{
                viewMode: 1,
                dragMode: 'crop',
                // aspectRatio: 16 / 9,
                aspectRatio: props.aspectRatio,
              }"
              @ready="ready"
            />
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref,  } from 'vue'
  import VuePictureCropper, { cropper } from 'vue-picture-cropper'

  const emit = defineEmits(['setPicture'])

  const props = defineProps({
    aspectRatio: {
      type: Number,
      default() {
        return 1/1
      }
    },
    accept:{
      type: String,
      default() {
        return 'image/jpg, image/jpeg'
      }    
    }
  })

  const isShowModal = ref<boolean>(false)
  const uploadInput = ref<HTMLInputElement | null>(null)
  const pic = ref<string>('')
  const result = reactive({
    dataURL: '',
    blobURL: '',
  })

  function erasePicture() {
    pic.value = ''
    result.dataURL = ''
    result.blobURL = ''
    emit('setPicture', {})
  }

  /**
   * Select the picture to be cropped
   */
  function selectFile(e: Event) {
    // Reset last selection and results
    pic.value = ''
    result.dataURL = ''
    result.blobURL = ''

    // Get selected files
    const { files } = e.target as HTMLInputElement
    if (!files || !files.length) return

    // Convert to dataURL and pass to the cropper component
    const file = files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      // Update the picture source of the `img` prop
      pic.value = String(reader.result)

      // Show the modal
      isShowModal.value = true

      // Clear selected files of input element
      if (!uploadInput.value) return
      uploadInput.value.value = ''
    }
  }

  /**
   * Get cropping results
   */
  async function getResult() {
    if (!cropper) return
    const base64 = cropper.getDataURL({
      maxWidth: 1200,
      imageSmoothingQuality: 'high'
    })
    const blob: Blob | null = await cropper.getBlob({
      maxWidth: 1200,
      imageSmoothingQuality: 'high'
    })
    if (!blob) return

    // const file = await cropper.getFile({
    //   fileName: 'picture',
    // })

    // console.log({ base64, blob, file })
    result.dataURL = base64
    result.blobURL = URL.createObjectURL(blob)
    isShowModal.value = false
    // emit
    emit('setPicture', result)
  }

  /**
   * Clear the crop box
   */
  function clear() {
    if (!cropper) return
    cropper.clear()
  }

  /**
   * Reset the default cropping area
   */
  function reset() {
    if (!cropper) return
    cropper.reset()
  }

  /**
   * The ready event passed to Cropper.js
   */
  function ready() {
    console.log('Cropper is ready.')
  }

  /**
   * Open the file dialog
   */
  function openFile(event: MouseEvent) {
    event.preventDefault()
    if (!uploadInput.value) return
    uploadInput.value.click()
  }
</script>