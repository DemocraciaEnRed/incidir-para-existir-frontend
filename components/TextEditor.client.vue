<template>
  <div>
    <div v-if="editor" class="space-x-2 border rounded-md rounded-bl-none rounded-br-none border-b-0 border-gray-700 p-2">
      <UButton icon="i-heroicons-bold" color="gray" variant="solid"
        :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()" />
      <UButton icon="i-heroicons-italic" color="gray" variant="solid"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()" />
        <span>|</span>
      <!-- <UButton icon="i-heroicons-strikethrough" color="gray" variant="solid"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }" @click="editor.chain().focus().toggleStrike().run()" />
      <UButton icon="i-heroicons-code" color="gray" variant="solid"
        :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }"
        @click="editor.chain().focus().toggleCode().run()" /> -->
      <!-- <UButton icon="i-heroicons-no-symbol" color="gray" variant="solid"
        @click="editor.chain().focus().unsetAllMarks().run()" /> -->
      <UButton icon="i-heroicons-no-symbol" color="gray" variant="solid"
        @click="editor.chain().focus().clearNodes().run()" />
      <UButton icon="i-heroicons-h1" color="gray" variant="solid"
      :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" />
      <UButton icon="i-heroicons-h2" color="gray" variant="solid"
      :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" />
      <UButton icon="i-heroicons-h3" color="gray" variant="solid"
      :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" />
      <UButton icon="i-heroicons-bars-arrow-down" color="gray" variant="solid"
        :class="{ 'is-active': editor.isActive('paragraph') }" @click="editor.chain().focus().setParagraph().run()" />
      <UButton icon="i-heroicons-list-bullet" color="gray" variant="solid"
        :class="{ 'is-active': editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()" />
      <UButton icon="i-heroicons-numbered-list" color="gray" variant="solid"
        :class="{ 'is-active': editor.isActive('orderedList') }"
        @click="editor.chain().focus().toggleOrderedList().run()" />
      <UButton icon="i-heroicons-code-bracket" color="gray" variant="solid"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
        @click="editor.chain().focus().toggleCodeBlock().run()" />
      <UButton icon="i-heroicons-chat-bubble-bottom-center-text" color="gray" variant="solid"
        :class="{ 'is-active': editor.isActive('blockquote') }"
        @click="editor.chain().focus().toggleBlockquote().run()" />
      <UButton  icon="i-heroicons-minus" color="gray" variant="solid" @click="editor.chain().focus().setHorizontalRule().run()" />
      <UButton icon="i-heroicons-arrow-uturn-left" color="gray" variant="solid" :disabled="!editor.can().chain().focus().undo().run()"
        @click="editor.chain().focus().undo().run()" />
      <UButton icon="i-heroicons-arrow-uturn-right" color="gray" variant="solid" :disabled="!editor.can().chain().focus().redo().run()"
        @click="editor.chain().focus().redo().run()" />
    </div>
    <div class="border rounded-md rounded-tl-none rounded-tr-none border-gray-700 px-2 py-5 sm:p-4 ">
    <TiptapEditorContent :editor="editor" />
    </div>
    <!-- <UCard :ui="{ body: { padding: 'px-2 py-5 sm:py-4 sm:px-3 ' } }">
    </UCard> -->
  </div>
</template>

<script setup>
const props = defineProps({
  content: {
    type: [String, null, undefined],
    required: false,
    default: () => ''
  },
})

let editorContent = '<p>Escriba el contenido aquí...</p>';
if (props.content) {
  editorContent = props.content
}

const editor = useEditor({
  extensions: [TiptapStarterKit],
  editorProps: {
    attributes: {
      class: 'w-full prose dark:prose-invert focus:outline-none max-w-none',
    },
  },
});

onMounted(() => {
  // eslint-disable-next-line no-extra-boolean-cast
  if (!!unref(editor)) {
    // Will work fine because this is executed on Client side
    unref(editor).commands.setContent(editorContent);
  }
});

onBeforeUnmount(() => {
  unref(editor).destroy();
});

const getHTML = () => {
  return unref(editor).getHTML();
}

defineExpose({
  getHTML
})
</script>