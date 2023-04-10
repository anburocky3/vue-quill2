<template>
  <h1>Add Modules</h1>
  <QuillEditor v-model:content="content" :modules="modules" toolbar="full" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QuillEditor, Delta } from 'anburocky3/vue-quill2'
import BlotFormatter from 'quill-blot-formatter'

const modules = {
  name: 'blotFormatter',
  module: BlotFormatter,
  options: {
    /* options */
  },
}
const content = ref<Delta>(
  new Delta([
    { insert: 'Gandalf', attributes: { bold: true } },
    { insert: ' the ' },
    { insert: 'Grey', attributes: { color: '#ccc' } },
  ])
)
</script>
