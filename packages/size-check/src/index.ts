import { h, createApp } from 'vue'
import { QuillEditor } from 'anburocky3/vue-quill2'

// The bare minimum code required for rendering something to the screen
const app = createApp({
  render: () => h('div', 'hello world!'),
})
app.component('QuillEditor', QuillEditor)
app.mount('#app')
