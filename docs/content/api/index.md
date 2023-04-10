# Props

## v-model:content

- **Type:** `Delta | String`
- **Default:** `{}`
- **Return:** `Delta`

  Two-way binding editor content, can be `Delta` object, plain `text`, or `html` string, see [Quill Delta docs](https://quilljs.com/docs/delta/) for more details.

  ::: warning
  Your content and content type must match, if you want to use `html` as your content you must set your `contentType` to `html`, as well as `text`.
  :::

## content

- **Type:** `Delta | String`
- **Default:** `{}`

  Contents for the editor, can be `Delta` object, plain `text`, or `html` string, see [Quill Delta docs](https://quilljs.com/docs/delta/) for more details.

## contentType

- **Type:** `"delta" | "html" | "text"`
- **Default:** `delta`

  VueQuill supports three content type `delta`, `html`, and `text`, and make sure to set contentType if you want to use `html` or plain `text` as your content.

  ::: tip
  Use `delta` (default value) content type to prevent issues and is the best practice.
  :::

## enable

- **Type:** `Boolean`
- **Default:** `true`

  Set ability for user to edit, via input devices like the mouse or keyboard.

## readOnly

- **Type:** `Boolean`
- **Default:** `false`

  If _true_, the editor won't allow changing its contents. Wraps the Quill [`disable` API](https://quilljs.com/docs/api/#disable).

## placeholder

- **Type:** `String`

  The attribute to specifies a short hint that describes the expected value of an input field (e.g. a sample value or a short description of the expected format).

## theme

- **Type:** `"snow" | "bubble" | ""`
- **Default:** `"snow"`

  The name of the theme to apply to the editor, Quill features two officially supported themes: `snow` and `bubble`. Pass `""` to use the minimal core theme. See the [docs on themes](https://quilljs.com/docs/themes/) for more information on including the required stylesheets.

## toolbar

- **Type:** `String | Array | Object`

  Toolbar options to configure the default toolbar icons using an array of format names, see [Toolbar](../guide/toolbar.md) section for more details.

## modules

- **Type:** `Object | Object[]`

  Options to register modules, see [Modules](../guide/modules.md) section for more details.

## options

- **Type:** `Object`

  Options to configure Quill, see [the docs options](../guide/options.md) for more details

## globalOptions

- **Type:** `Object`

  Global Options to configure Quill, see [the docs options](../guide/options.md) for more details

  ::: warning
  Only use `globalOptions` when you register QuillEditor component globally
  :::

- **Usage:**

  ```js
  import { createApp } from 'vue'
  import { QuillEditor } from 'anburocky3/vue-quill2'

  const app = createApp()
  // define your options
  const globalOptions = {
    debug: 'info',
    modules: {
      toolbar: 'minimal',
    },
    placeholder: 'Compose an epic...',
    readOnly: true,
    theme: 'snow',
  }
  // set default globalOptions prop
  QuillEditor.props.globalOptions.default = () => globalOptions
  // register QuillEditor component
  app.component('QuillEditor', QuillEditor)
  ```
