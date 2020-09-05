const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONF } = require('./conf/db')
const { isPrd }  = require('./utils/env')

// 引入路由
const index = require('./routes/index')
const users = require('./routes/users')
const errorViewRouter = require('./routes/view/error')
const userViewRouter = require('./routes/view/user')
const userApiRouter = require('./routes/api/users')

// error handler  监听错误并且在页面显示
// 动态定义错误配置（开发与上线环境）
let onerrorConf = {}
if (isPrd) {
    onerrorConf = {
        redirect: '/error' // 如果有报错则重定向到错误页
    }
}
onerror(app, onerrorConf)

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

// session配置
app.keys = ['ODST935#'] // 设置cookie的加密密匙
app.use(session({
    key: 'weibo.sid', // 配置cookie的名称
    prefix: 'weibo:scss', // 配置redis key的前缀
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24*60*60*1000
    },
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}` // 考虑到线上和线下环境的问题，所以使用这个动态配置端口号和域名
    })
}))

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
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 404路由必须写在最后才能兜住。

// error-handling 监听错误并且打印出来
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
