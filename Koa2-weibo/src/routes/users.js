const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response'
})

router.post('/login', async (ctx, next) => { // 模拟登录接口
    const { username, password } = ctx.request.body // 获取post中的数据
    ctx.body = {
        username,
        password,
        msg: 'Hello I am post'
    }
})

module.exports = router
