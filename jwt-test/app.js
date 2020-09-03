const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwtkoa = require('koa-jwt') // 引入jwt验证工具
const { SECRET } = require('./conf/constants') // 引入密匙

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// 注册jwt，进行jwt验证，即所有请求（不包括无需验证的请求）都需要带token否则就是401无权限
app.use(jwtkoa({
  secret: SECRET // 密匙
}).unless({
  path: [/^\/users\/login/] // 定义无需jwt验证的目录，这里是登录无需jwt验证
}))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
