> 技术栈： express vue vue-server-render
> 关键词：后端服务 前后端桥梁 前端模板 vue组件 vue路由
# 1.开启express后端服务
```js
const express = require('express')
const app = express()
app.get('*',async(req,res)=>{
 res.send("hello world")
})

app.listen(3000,()=>{
 console.log('open server on 3000')
})
```

# 2.使用vue开发页面
```js
const Vue  = require('vue')
module.exports = context => {
 const app = new Vue({
  template:`<div>hello vue</div>`
 })
 return { app }
}
```
# 3.创建html模板
```html
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>vueSSR</title>
</head>
<body>
 <!--vue-ssr-outlet-->
</body>
</html>
```
# 4.创建前后端桥梁  
```js
const App = require('../app.js')
module.exports = context =>{
 return new Promise((res,rej)=>{
  const {app,router} = App(context)
  res(app)
 })
}
```
# 5.使用vue-server-renderer在服务端进行页面渲染
* 引入模板
```js
const fs = require('fs')
const path = require('path')
const vueServerRender = require('vue-server-renderer').createRenderer({
 template:fs.readFileSync(path.join(__dirname,'./index.html'),'utf-8')
})
```
* 返回客户端渲染好的页面
```js
const App = require('./src/entry-server.js')
app.get('*',async(req,res)=>{
 const {url} = req
 const context = {url}
 const vm = await App(context)
 vueServerRender.renderToString(vm).then((html) => {
  res.end(html)
 }).catch(err=>console.log(err))
})
```