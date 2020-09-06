/**
 * @description 处理注册和是否重名的路由
 * @author Sheng14
 */

const router = require('koa-router')()
const { isExist, register } = require('../../controller/user')

router.prefix('/api/user')

// 注册用户
router.post('/register', async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body // 获取要注册的用户信息
    ctx.body = await register({userName, password, gender}) // 解构方式传值调用controller里面的注册函数
})

// 判断用户名是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body // 这一层只需要负责获取参数
    // controll 调用controller里面的方法
    ctx.body = await isExist(userName)
    // ctx.body = xxxx 返回数据即可！
})

module.exports = router