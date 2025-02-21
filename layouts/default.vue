<script setup lang="ts">
</script>


<template>
  <div class="flex h-screen flex-col">
    <div class="flex-grow flex-shrink basis-auto">
      <TheNavbar />
      <slot />
    </div>
    <TheFooter />
  </div>
</template>


<style scoped>
/* No additional styles needed */
</style>
