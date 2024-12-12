<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen">
    <TheNavbar />
    <UContainer class="my-9">
      <slot />
    </UContainer>
    <TheFooter />
  </div>
</template>


<style scoped>
/* No additional styles needed */
</style>
