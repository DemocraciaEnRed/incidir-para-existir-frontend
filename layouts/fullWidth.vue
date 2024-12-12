<!-- <script lang="ts" setup>
definePageMeta({
  name: 'defaultLayout'
})
</script> -->

<template>
  <div class="min-h-screen">
    <TheNavbar />
    <slot />
    <TheFooter />
  </div>
</template>


<style scoped>
/* No additional styles needed */
</style>
