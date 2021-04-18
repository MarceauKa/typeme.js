# TypeMe.js

TypeMe.js is a super simple type writer effect using web components. Look at this [simple demo](https://marceauka.github.io/typeme.js/) to see it in action.

⚠️ This library is usable in production but still in production

- [Installation](#installation)
- [Usage](#usage)
- [Styling](#styling)
- [Licence](#licence)

## Installation

⬆️ [Top](#typemejs) ➡️ [Guide](#guide) 

Using a CDN

```
https://unpkg.com/typeme/dist/typeme.min.js
```

### Import with yarn or npm

```
npm install typeme --save
```

## Usage

⬆️ [Top](#typemejs) ➡️ [API](#api)

Using this library is simple. Anywhere in your code call this HTML tag `<type-me></type-me>`.

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