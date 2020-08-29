const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler  监听错误并且在页面显示
onerror(app)

// middlewares 处理post数据
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public')) // 将前端部分放到静态资源中，就可以通过url访问到如：http://localhost:3000/stylesheets/style.css

app.use(views(__dirname + '/views', {
  extension: 'ejs'
})) // 注册ejs，不然到时编译无法识别出来，而且要使用模板文件的时候就只需要写ejs的名称即可，其它路径已经在这里注册了

// logger 这里可以说就是手写的一个中间件，与之前的logger重复，可以不要。
/*app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})*/

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling 监听错误并且打印出来
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
