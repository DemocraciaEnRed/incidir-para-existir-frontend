<script setup>

const { status, data: userData } = useAuth()
const { $api } = useNuxtApp()

const props = defineProps({
  entryId: {
    type: [String, Number],
    required: true
  }
})

const isLoggedIn = computed(() => status.value === 'authenticated')
const theComment = ref('')

const { data: comments, refresh } = useAPI(`blog/${props.entryId}/comments`, {
  server: false,
})

const visibleComments = ref(3)

const visibleCommentsArr = computed(() => {
  if(comments.value) {
    return comments.value.slice(0, visibleComments.value)
  }
  return []
})

const totalComments = computed(() => {
  if(comments.value) {
    return comments.value.length
  }
  return 0
})

const showMore = () => {
  if (visibleComments.value >= totalComments.value) return
  visibleComments.value += 5
}

const allCommentsVisible = computed(() => {
  return visibleComments.value >= totalComments.value
})

const addComment = async () => {
  try {

    if(!theComment.value) return
    await $api(`blog/${props.entryId}/comments`,{
      method: 'POST',
      body: JSON.stringify({
        text: theComment.value
      })
    })
    theComment.value = ''
    refresh()
    toast.add({ title: 'Éxito', description: 'El comentario ha sido guardado.', color: 'green' }); 
  } catch (error) {
    toast.add({ title: 'Error', description: 'Hubo un error al guardar el comentario. Inténtalo nuevamente.', color: 'red' });
    console.error(error)
  }
    
}
</script>

<template>
  <div class="">
    <div class="px-4 py-5">
      <div v-if="!isLoggedIn" class="text-center">
        <p class="font-oswald text-2xl uppercase mb-3">¿Queres participar dejando comentarios?</p>
        <UButton to="/login" variant="solid" size="xl" color="primary" block class="text-2xl" :ui="{ rounded: 'rounded-full' }">Iniciar sesión</UButton>
      </div>
      <div v-else>
        <div class="flex justify-start">
          <UAvatar size="lg" :src="userData.imageUrl" :alt="userData?.fullName" />
          <div class="w-full space-y-2 ml-3">
            <p class="font-medium">{{ userData?.fullName }}</p>
            <UTextarea v-model="theComment" placeholder="Escribe tu comentario" class="border border-slate-400 rounded shadow-sm" variant="none" :autoresize="true" />
            <div class="flex justify-end">
              <UButton vsize="sm" :padded="false" color="primary" variant="link" icon="i-heroicons-arrow-up-right" :trailing="true" @click="addComment">Comentar</UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
    <UDivider class="my-5" />
    <div class="space-y-5">
      <BlogCommentsWrapper v-for="comment in visibleCommentsArr" :key="comment.id" :comment="comment" @refresh="refresh" />
      <UButton v-if="!allCommentsVisible" block variant="outline" color="black" size="xl" :ui="{ rounded: 'rounded-full' }"  @click="showMore">Ver más comentarios</UButton>
      <p v-if="totalComments === 0" class="text-center text-gray-500">No hay comentarios disponibles.</p>
      <p v-if="totalComments > 0" class="text-center text-gray-500">{{ totalComments }} comentario(s) en total.</p>
      <p v-if="allCommentsVisible && totalComments > 0" class="text-center text-gray-500">Todos los comentarios están visibles.</p>
    </div>
  </div>
</template>