const App = require('./app.js')
module.exports = context =>{
 return new Promise((res,rej)=>{
  const {app,router} = App(context)
  res(app)
 })
}