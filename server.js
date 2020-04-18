const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const App = require('./src/entry-server.js')
const vueServerRender = require('vue-server-renderer').createRenderer({
 template:fs.readFileSync(path.join(__dirname,'./index.html'),'utf-8')
})


app.get('*',async(req,res)=>{
 const {url} = req
 const context = {url}
 const vm = await App(context)
 vueServerRender.renderToString(vm).then((html) => {
  res.end(html)
 }).catch(err=>console.log(err))
})

app.listen(3000,()=>{
 console.log('open server on 3000')
})