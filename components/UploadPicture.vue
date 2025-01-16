<template>
  <div >
    <!-- Select a picture for cropping -->
    <section class="section">

      <!-- Set a button that invokes selecting an image -->
      <button class="select-picture">
        <UButton @click="openFile">Seleccionar imagen</UButton>
        <input
          ref="uploadInput"
          type="file"
          class="hidden"
          accept="image/jpg, image/jpeg, image/png, image/gif"
          @change="selectFile"
        >
      </button>
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
                aspectRatio: 1/1,
              }"
              @ready="ready"
            />
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import VuePictureCropper, { cropper } from 'vue-picture-cropper'


export default defineComponent({
  components: {
    VuePictureCropper,
  },
  setup() {
    const isShowModal = ref<boolean>(false)
    const uploadInput = ref<HTMLInputElement | null>(null)
    const pic = ref<string>('')
    const result = reactive({
      dataURL: '',
      blobURL: '',
    })

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
      const base64 = cropper.getDataURL()
      const blob: Blob | null = await cropper.getBlob()
      if (!blob) return

      const file = await cropper.getFile({
        fileName: 'test-test',
      })

      console.log({ base64, blob, file })
      result.dataURL = base64
      result.blobURL = URL.createObjectURL(blob)
      isShowModal.value = false
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

    return {

      // Data
      uploadInput,
      pic,
      result,
      isShowModal,
      openFile,

      // Methods
      selectFile,
      getResult,
      clear,
      reset,
      ready,
    }
  },
})
</script>