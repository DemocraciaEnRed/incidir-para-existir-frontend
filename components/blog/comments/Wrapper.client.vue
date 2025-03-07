<script setup>
import { BlogCommentsDeleteModal } from '#components'

const { status, data: userData } = useAuth()
const { $api } = useNuxtApp()
const toast = useToast();
const modal = useModal();

const props = defineProps({
  comment: {
    type: Object,
    required: true
  },
})
const { comment } = props

const isLoggedIn = computed(() => status.value === 'authenticated')
const canDelete = computed(() => {
  if(isLoggedIn.value && userData.value.role === 'admin') return true
  if(isLoggedIn.value && userData.value.id == comment.authorId) return true
  return false
})


const emit = defineEmits(['refresh'])

const isLoading = ref(false)
const commentReplies = ref(comment.replies)

const visibleReplies = ref(2)

const visibleRepliesArr = computed(() => {
  return commentReplies.value.slice(0, visibleReplies.value)
})

const totalReplies = computed(() => commentReplies.value.length)

const showMore = () => {
  if(visibleReplies.value >= totalReplies.value) return
  visibleReplies.value += 5
}

const allRepliesVisible = computed(() => {
  return visibleReplies.value >= totalReplies.value
})

const showReplyForm = ref(false)
const replyComment = ref('')

const updateReplies = async () => {
  try {

    const replies = await $api(`blog/${comment.blogEntryId}/comments/${comment.id}/replies`,{
      method: 'GET',
    })
    commentReplies.value = replies
  } catch (error) {
    console.error(error)
  }
}

const addReply = async () => {
  if(!replyComment.value) return
  isLoading.value = true
  try {
    await $api(`blog/${comment.blogEntryId}/comments/${comment.id}/replies`,{
      method: 'POST',
      body: JSON.stringify({
        text: replyComment.value
      })
    })
    await updateReplies()
    // put the reply at the top of the list
    replyComment.value = ''
    showReplyForm.value = false
    toast.add({ title: 'Éxito', description: 'La respuesta se ha guardado con éxito.', color: 'green' });
  } catch (error) {
    toast.add({ title: 'Error', description: 'Hubo un error al intentar guardar la respuesta. Inténtalo nuevamente..', color: 'red' });
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const openDeleteCommentModal = (comment) => {
  modal.open(BlogCommentsDeleteModal, {
    entry: comment,
    onDeleteEntry: () => {
      deleteComment(comment)
    },
    onCloseModal: () => {
      modal.close()
    }
  })
}

const deleteComment = async (comment) => {
  try {
    await $api(`blog/${comment.blogEntryId}/comments/${comment.id}`,{
      method: 'DELETE',
    })
    emit('refresh')
    toast.add({ title: 'Éxito', description: 'El comentario ha sido eliminado correctamente.', color: 'green' });
  } catch (error) {
    toast.add({ title: 'Error', description: 'Hubo un error al intentar eliminar el comentario. Inténtalo nuevamente..', color: 'red' });
    console.error(error)
  } finally {
    modal.close()
  }
}

</script>

<template>
  <div>
    <div class="flex justify-start">
      <UAvatar size="lg" :src="comment.author.imageUrl" :alt="comment.author.fullName" />
      <div class="w-full space-y-1 ml-3">
        <div class="flex justify-between items-end">
          <p class="font-medium flex justify-center gap-2">{{ comment.author.fullName }} <UIcon v-if="comment.author.role == 'admin'" name="i-heroicons-shield-check" class="w-5 h-5 text-blue-500" /></p>          

          <div class="flex gap-2">
            <UButton v-if="canDelete" class="text-xs" size="xs" :padded="false" color="red" variant="link" icon="i-heroicons-trash" :trailing="true" @click="openDeleteCommentModal(comment)">Eliminar</UButton>
            <p class="text-sm text-gray-500">{{ formatDate(comment.createdAt) }}</p>
          </div>
        </div>
        <p class="font-inter text-justify whitespace-pre-line">{{ comment.text }}</p>
        <div class="">
          <UButton v-if="isLoggedIn" variant="link" color="primary" :padded="false" icon="i-heroicons-arrow-uturn-left" :trailing="true" @click="showReplyForm = !showReplyForm">Responder ({{ totalReplies }})</UButton>          
        </div>
      </div>
    </div>
    <div class="space-y-3 mt-5 w-10/12 md:w-11/12 ml-auto">
      <div v-if="showReplyForm" class="flex justify-start">
        <UAvatar size="sm" :src="userData.imageUrl" :alt="userData.fullName" class="" />
        <div class="ml-3 w-full space-y-2">
          <UTextarea v-model="replyComment"  class="border border-slate-400 rounded shadow-sm" variant="none" placeholder="Escribe tu respuesta..." :rows="1" :autoresize="true" />
          <div class="flex justify-end">
            <UButton size="sm" :padded="false" color="primary" :loading="isLoading" variant="link" icon="i-heroicons-arrow-up-right" :trailing="true" @click="addReply">Responder</UButton>
          </div>
        </div>
      </div>
      <BlogCommentsReplyWrapper v-for="reply in visibleRepliesArr" :key="reply.id" :reply="reply" @refresh="updateReplies" />
      <UDivider v-if="!allRepliesVisible" :label="`Cargar más respuestas ↴ (${totalReplies - visibleReplies})`" class="cursor-pointer" :ui="{ label: 'text-blue-600 dark:text-blue-600' }" @click="showMore"
      />
    </div>
  </div>
</template>
