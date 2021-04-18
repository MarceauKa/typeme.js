class TypeMe extends HTMLElement {
  constructor () {
    super()

    this.words = []
    this.current = 0
    this.state = null
    this.wordInterval = null
    this.typeInterval = null
    this.$text = null
    this.$cursor = null
    this.$style = null

    this.config = {
      duration: 250,
      pause: 1000,
      shuffle: false,
      cursorSpeed: 250,
    }
    
    this.injectDom()
  }

  initialize () {
    this.configureWords()

    this.config.duration = this.parseTimeValue(this.dataset.duration, 250)
    this.config.pause = this.parseTimeValue(this.dataset.pause, 1000)
    this.config.shuffle = this.dataset.hasOwnProperty('shuffle')
    this.config.cursorSpeed = this.parseTimeValue(this.dataset.cursorSpeed, 250)

    this.run()
  }

  run () {
    this.state = 'roll'

    this.wordInterval = setInterval(() => {
      if (this.state === 'paused') {
        return
      }

      if (this.state === 'roll') {
        this.nextWord()
        this.typeWord()
      }
    }, this.config.duration)
  }

  nextWord () {
    let nextIndex = null
    let length = this.words.length

    if (true === this.config.shuffle) {
      nextIndex = this.words.indexOf(this.words[Math.floor(Math.random() * length)])
    }

    if (false === this.config.shuffle) {
      nextIndex = this.current < length - 1 ? this.current + 1 : 0
    }

    this.current = nextIndex
  }

  typeWord () {
    let word = this.words[this.current]
    let max = word.length - 1
    let position = 0
    let inverse = false
    let status = null

    let fold = () => {
      this.$text.insertAdjacentHTML('beforeend', `<span>${word[position]}</span>`)

      if (position === max) {
        return false
      }

      position++
      return true
    }

    let unfold = () => {
      this.$text.removeChild(this.$text.querySelector(`span:nth-child(${position + 1})`))

      if (position === 0) {
        return false
      }

      position--
      return true
    }

    let timer = () => {
      return setInterval(() => {
        if (this.state === 'paused') {
          return
        }

        if (false === inverse) {
          status = fold()
        }

        if (true === inverse) {
          status = unfold()
        }

        if (false === status && false === inverse) {
          clearInterval(this.typeInterval)
          inverse = true

          setTimeout(() => {
            this.typeInterval = timer()
          }, this.config.pause)
        }

        if (false === status && true === inverse && position === 0) {
          clearInterval(this.typeInterval)

          setTimeout(() => {
            this.state = 'roll'
          }, this.config.pause)
        }
        
      }, this.config.duration)
    }

    this.state = 'typing'
    this.typeInterval = timer()
  }

  configureWords () {
    let dataWords = this.dataset.words || "shorts, on, words"
    let rawWords = dataWords.split(',')
    let words = []

    rawWords.forEach(word => {
      words.push(word.trim())
    })

    this.words = words
    this.current = 0
  }

  parseTimeValue (value, defaultValue = null) {
    let regex = new RegExp('([1-9]{1}[0-9]{0,})(ms|s)?')
    let matches = regex.exec(value)
    let parsed = defaultValue
    let multiplier = matches && matches[2] === 's' ? 1000 : 1

    if (matches && matches[1]) {
      parsed = Number(matches[1]) * multiplier
    }

    return parsed
  }

  injectDom () {
    this.attachShadow({mode: 'open'})
    this.classList.add('typeme')

    this.$text = document.createElement('span')
    this.$text.classList.add('typeme-text')

    this.$cursor = document.createElement('span')
    this.$cursor.classList.add('typeme-cursor')
    this.$cursor.textContent = '|'

    this.$style = document.createElement('style')
    this.$style.textContent = `
    .typeme {
      display: flex;
    }
    .typeme-text {}
    .typeme-cursor {
      opacity: 1;
      animation-name: typeMeCursor;
      animation-duration: ${this.config.cursorSpeed}ms;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      animation-fill-mode: both;
    }
    @keyframes typeMeCursor {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    `

    this.shadowRoot.append(this.$style, this.$text, this.$cursor)
  }

  connectedCallback () {
    this.initialize()
  }

  /* @todo */
  disconnectedCallback () {
    // ...
  }

  /* @todo */
  attributeChangedCallback (name, oldValue, newValue) {
    // ...
  }

  /* @todo */
  static get observedAttributes() {
    return []
  }
}

customElements.define('type-me', TypeMe)
