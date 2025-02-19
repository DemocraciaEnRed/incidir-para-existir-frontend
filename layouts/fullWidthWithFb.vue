<script setup>
// const runtimeConfig = useRuntimeConfig()

// useHead({
//   script: [
//     {
//       src: `https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v22.0&appId=${runtimeConfig.public.facebookAppId}`,
//       crossorigin: 'anonymous',
//       async: true,
//       defer: true
//     }
//   ],
//   meta: [
//     {
//       property: 'fb:app_id',
//       content: runtimeConfig.public.facebookAppId
//     }
//   ]
// })

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

