<script setup lang="ts">
import { ref } from 'vue'
import { QuillEditor, Delta } from 'anburocky3/vue-quill2'

const content = ref<Delta | null>(null)
</script>

<template>
  <h1>Basic Example</h1>
  <QuillEditor v-model:content="content" />
</template>
