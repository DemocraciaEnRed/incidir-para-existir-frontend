<script setup>
import { BlogCommentsDeleteModal } from '#components'

const { status, data: userData } = useAuth()
const { $api } = useNuxtApp()
const toast = useToast();
const modal = useModal();
const emit = defineEmits(['refresh'])

const props = defineProps({
  reply: {
    type: Object,
    required: true
  }
})
const { reply } = props

const isLoggedIn = computed(() => status.value === 'authenticated')

const canDelete = computed(() => {
  if(isLoggedIn.value && userData.value.role === 'admin') return true
  if(isLoggedIn.value && userData.value.id == reply.authorId) return true
  return false
})

const openDeleteCommentModal = (reply) => {
  modal.open(BlogCommentsDeleteModal, {
    entry: reply,
    onDeleteEntry: () => {
      deleteComment(reply)
    },
    onCloseModal: () => {
      modal.close()
    }
  })
}

const deleteComment = async (reply) => {
  try {
    await $api(`blog/${reply.blogEntryId}/comments/${reply.id}`,{
      method: 'DELETE',
    })
    emit('refresh')
    toast.add({ title: 'Éxito', description: 'El comentario ha sido eliminado.', color: 'green' });
  } catch (error) {
    toast.add({ title: 'Error', description: 'Hubo un error al intentar eliminar el comentario. Inténtalo nuevamente..', color: 'red' });
    console.error(error);
  } finally {
    modal.close()
  }
}

</script>

<template>
  <div>
    <div class="flex justify-start">
      <UAvatar size="sm" :src="reply.author.imageUrl" :alt="reply.author.fullName" />
      <div class="w-full space-y-1 ml-3">
        <div class="flex justify-between items-end">
          <p class="font-medium">{{ reply.author.fullName }}</p>
          <div class="flex gap-2">
            <UButton v-if="canDelete" class="text-xs" size="xs" :padded="false" color="red" variant="link" icon="i-heroicons-trash" :trailing="true" @click="openDeleteCommentModal(reply)">Eliminar</UButton>
            <p class="text-xs text-gray-500">{{ formatDate(reply.createdAt) }}</p>
          </div>
        </div>
        <p class="text-sm font-inter text-justify whitespace-pre-line">{{ reply.text }}</p>
      </div>
    </div>
  </div>
</template>