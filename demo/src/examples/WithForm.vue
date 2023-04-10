<template>
  <QuillEditor v-model:content="inputValue" content-type="html" theme="snow" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { QuillEditor } from 'anburocky3/vue-quill2'

export default defineComponent({
  components: {
    QuillEditor,
  },
  setup() {
    const inputValue = ref('<h1>This is header</h1><p>This is paragraph</p>')
    return { inputValue }
  },
})
</script>
