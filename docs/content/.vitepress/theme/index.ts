import { h, defineAsyncComponent } from 'vue'
import Theme from 'vitepress/theme'
import HomeDemo from './components/HomeDemo.vue'
import Loading from './components/Loading.vue'

import './styles/tailwind.css'
import './styles/vars.css'

const QuillEditor = defineAsyncComponent({
  loader: () =>
    import('anburocky3/vue-quill2').then((VueQuill) => VueQuill.QuillEditor),
  loadingComponent: Loading,
})

import 'anburocky3/vue-quill2/dist/vue-quill2.core.css' // import styles
import 'anburocky3/vue-quill2/dist/vue-quill2.bubble.css' // for bubble theme
import 'anburocky3/vue-quill2/dist/vue-quill2.snow.css' // for snow theme

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      'home-features-after': () => h(HomeDemo),
      // 'aside-ads-before': () => h(AsideSponsors)
    })
  },
  enhanceApp({ app, router, siteData }) {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
    app.component('QuillEditor', QuillEditor)
  },
}
