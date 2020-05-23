class TextScramble {
    constructor(el) {
      this.el = el
      this.chars = '!@#$%^&*()_-=+{}:"|<>?,./;'
      this.update = this.update.bind(this)
    }
    setText(newText) {
      const oldText = this.el.innerText
      const length = Math.max(oldText.length, newText.length)
      const promise = new Promise((resolve) => this.resolve = resolve)
      this.queue = []
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = Math.floor(Math.random() * 40)
        const end = start + Math.floor(Math.random() * 40)
        this.queue.push({ from, to, start, end })
      }
      cancelAnimationFrame(this.frameRequest)
      this.frame = 0
      this.update()
      return promise
    }
    update() {
      let output = ''
      let complete = 0
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
          complete++
          output += to
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar()
            this.queue[i].char = char
          }
          output += `<span class="dud">${char}</span>`
        } else {
          output += from
        }
      }
      this.el.innerHTML = output
      if (complete === this.queue.length) {
        this.resolve()
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
  }
  
  const phrases = [
    'Dont call me Hacker!.',
    'I\'m not a Hacker.',
    'I\'m Cyber Security!',
    'Your website security is in my hands!',
  ]
  
  const el = document.querySelector('.text')
  const fx = new TextScramble(el)
  
  let counter = 0
  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 1500)
    })
    counter = (counter + 1) % phrases.length
  }
  
  next()
  
  'use strict';
  
  var app = {
  
    chars: ['01101001 00100000 01100001 01101101',
            '01100011 01111001 01100010 01100101 01110010',
            '01110011 01100101 01100011 01110101 01110010 01101001 01110100 01111001',
            'Bad Security','Injection!','System Failure!','You Being Hacked!','Error!',
            'Out of Memory','Bad System','Free Your Mind!'],
  
    init: function () {
      app.container = document.createElement('div');
      app.container.className = 'animation-container';
      document.body.appendChild(app.container);
      window.setInterval(app.add, 100);
    },
  
    add: function () {
      var element = document.createElement('span');
      app.container.appendChild(element);
      app.animate(element);
    },
  
    animate: function (element) {
      var character = app.chars[Math.floor(Math.random() * app.chars.length)];
      var duration = Math.floor(Math.random() * 15) + 1;
      var offset = Math.floor(Math.random() * (50 - duration * 2)) + 3;
      var size = 10 + (15 - duration);
      element.style.cssText = 'right:'+offset+'vw; font-size:'+size+'px;animation-duration:'+duration+'s';
      element.innerHTML = character;
      window.setTimeout(app.remove, duration * 1000, element);
    },
  
    remove: function (element) {
      element.parentNode.removeChild(element);
    },
  
  };
  
  document.addEventListener('DOMContentLoaded', app.init);