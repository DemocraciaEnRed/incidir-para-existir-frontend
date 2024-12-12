<script setup lang="ts">

const { status } = useAuth()

</script>
<template>
  <UContainer>
    Am I logged In: {{ status }}    
  </UContainer>
</template>


<style>

</style>