<script setup>

const { $api } = useNuxtApp();
const toast = useToast();

const links = [{
  label: 'Listado',
  icon: 'i-heroicons-list-bullet',
  to: '/admin/iniciativas',
  exact: true
}, {
  label: 'Crear',
  icon: 'i-heroicons-plus',
  to: '/admin/iniciativas/crear',
  exact: true
},{
  label: 'Descargar CSV',
  icon: 'i-heroicons-arrow-down-tray',
  click: () => downloadCSV()
}]

const downloadCSV = async () => {
  console.log('Downloading CSV')
  try{
    // because this needs to be send with the bearer token
    const url = '/admin/initiatives/csv'
    const {_data, headers } = await $api.raw(url, {
      method: 'GET'
    })
    // extract from content-disposition the filename
    const filename = headers.get('content-disposition').split('filename=')[1]
    
    // download the csv
    const blob = new Blob([_data], { type: 'text/csv' })
    const urlBlob = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = urlBlob
    a.download = filename
    a.click()
  } catch (error) {
    console.log(error)
    toast.add({ title: 'Error', description: 'Hubo un error al descargar el CSV', color: 'red' })
  }
}
</script>

<template>
  <div>
    <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
    <br>
    <NuxtPage />
  </div>
</template>

<style>

</style>
