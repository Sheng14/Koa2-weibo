const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    await ctx.render('index', { // 异步读取模板文件（因为IO操作啊） 这个就是找到index.ejs咯，然后发送下面的数据给那里的变量！
        title: 'Hello Koa 2!',
        msg: '大家好，我是天天神抽',
        isMe: true,
        blogList: [
            {
                id: 1,
                title: 'A'
            },
            {
                id: 2,
                title: 'B'
            },
            {
                id: 3,
                title: 'C'
            }
        ]
    })
})

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
/* const session = ctx.session // 拿到session
  if (session.viewNum == null) { // 加一个访问次数
    session.viewNum = 0
  }
  session.viewNum++*/
    ctx.body = {
        title: 'koa2 json'/*,
      viewNum: session.viewNum*/
    }
})

router.get('/profile/:username', async (ctx, next) => { // 模拟获取个人主页的接口（单个动态参数）
    const { username } = ctx.params // 通过这个可以获得所有动态参数
    ctx.body = {
        msg: 'this is profile page',
        username
    }
})

router.get('/loadmore/:username/:pageIndex', async (ctx, next) => { // 模拟加载更多接口（多个动态参数）
    const { username, pageIndex } = ctx.params
    ctx.body = {
        msg: 'this is loadmore page',
        username,
        pageIndex
    }
})

module.exports = router
