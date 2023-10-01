# Modern functional-style Javascript

---

## Goals

- Refresh our JS
- Learn & practice writing modern, functional-style Javascript.
  - Object and array destructuring
  - arrow functions
  - `.map()`, `.filter()`, `.reduce()`, `.foreach()`
- More JS programming practice with the above to prepare us for React.js.

---

## Warmup & JS Review

---

**Question**

Do you prefer JS or Python? Why? What do you like or dislike about each language?

---

**Question**

What are some differences between running a JS program in the browser vs outside the browser using node.js?

---

**A (partial) Answer**

| Browser | node.js  |
| -------- | ------- |
| `window` | `global`|
| interact w/DOM and browser  - `window.document`, `window.history`, etc | interact w/shell and filesystem via node standard library  - `fs.appendFile()`, readline = require('readline') |

---

In summary - our JS code can be run in different **environments** - the browser environment vs the shell environment.

---

## Modern JS Language Features & Techniques

---

The Javascript language, sometime around 2015, underwent a major revision known as ES6 (ECMAScript 6) or ESCMAScript 2015 or ES2015.

---

- ECMA stands for European Computer Manufacturers Association
- They actually manage the formal JS specification
- That is why, technically speaking, the formal name for Javascript is ECMAScript. But people usually don't use that.

---

You can see the full history of the Javascript language specification [here](https://en.wikipedia.org/wiki/ECMAScript_version_history).

Since 2015 new features have been continuously added to JS, however 2015 was a watershed moment.

---

A full list of ES6 language features is [here, along with great examples.](http://es6-features.org/#Constants)

Let's briefly look at a few on the site.

---