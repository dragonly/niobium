const htmlParser = require('fast-html-parser')

let root = htmlParser.parse('<p id="root">Hello World!</p>')
console.log(root)