# Themes

Quill features two officially supported themes: `snow` and `bubble` see [DEMO](https://vueup.github.io/vue-quill2/).
Themes primarily control the visual look of Quill through its CSS stylesheet, and many changes can easily be made by overriding these rules. At the very least, the `core` theme must be included for modules like toolbars or tooltips to work.

To activate a theme, import the stylesheet for the themes you want to use.

```javascript
import 'anburocky3/vue-quill2/dist/vue-quill2.snow.css'
// OR | AND
import 'anburocky3/vue-quill2/dist/vue-quill2.bubble.css'
// you can use both themes at the same time and use them interchangeably
```

These stylesheets can be found in the Quill distribution, but for convenience, they are also linked in VueQuill's `dist` folder.

Then, pass the name of the theme to the [`theme prop`](../api/index.md).

```vue
<template>
  <QuillEditor theme="snow" ... />
</template>
```
