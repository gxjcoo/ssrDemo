const Vue  = require('vue')
module.exports = context => {
 const app = new Vue({
  template:`<div>hello vue</div>`
 })
 return { app }
}