# TypeMe.js

TypeMe.js is a super simple type writer effect using web components. Look at this [simple demo](https://marceauka.github.io/typeme.js/) to see it in action.

- [Installation](#installation)
- [Usage](#usage)
- [Styling](#styling)
- [Licence](#licence)

## Installation

⬆️ [Top](#typemejs) 

### Using a CDN

```html
<script src="https://unpkg.com/typemejs@latest/dist/typeme.min.js" async></script>
```

### Import with yarn or npm

[![NPM](https://nodei.co/npm/typemejs.png?mini=true)](https://npmjs.org/package/typemejs)

```
npm install typemejs --save
```

## Usage

⬆️ [Top](#typemejs)

Using this library is simple. Anywhere in your code call this HTML tag `<type-me></type-me>`. Don't forget to look at the [simple demo](https://marceauka.github.io/typeme.js/).

### Options

This plugin is configured with data attributes.

| Attribute `data-` | Default | Description |
|-------------------|---------|-------------|
| `words` | `shorts, on, words` | Words to be typed separated by a comma |
| `duration` | `250` | Duration in ms between each characters |
| `pause` | `1000` | Pause in ms between words |
| `shuffle` | - | Shuffle words |
| `cursor-speed` | `250` | Cursor speed in ms |

This is an example with all options:

```html
<type-me data-words="one, two, three" 
         data-duration="125" 
         data-pause="1000"
         data-cursor-speed="300"
         data-shuffle></type-me>
```

### Styling

This is a custom web element so you can bring your own CSS. You should know that the element has some CSS classes:

- `.typeme` for the wrapper
- `.typeme-text` for the words
- `.typeme-cursor` for the cusor 

# Licence

⬆️ [Top](#typemejs)

MIT
