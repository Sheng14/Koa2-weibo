const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/profile/:username', async (ctx, next) => { // 模拟获取个人主页的接口（单个动态参数）
  const { username } = ctx.params // 通过这个可以获得所有动态参数
  ctx.body = {
    msg: "this is profile page",
    username
  }
})

router.get('/loadmore/:username/:pageIndex', async (ctx, next) => { // 模拟加载更多接口（多个动态参数）
  const { username, pageIndex } = ctx.params
  ctx.body = {
    msg: "this is loadmore page",
    username,
    pageIndex
  }
})

module.exports = router
