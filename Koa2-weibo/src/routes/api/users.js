/**
 * @description 处理注册和是否重名的路由
 * @author Sheng14
 */

const router = require('koa-router')()
const { isExist, register, login, deleteCurUser } = require('../../controller/user')
const { userValidate } = require('../../validator/user') // 引入校验函数
const { genValidator } = require('../../middlewares/validator') // 引入可添加校验函数的校验中间件
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginChecks')

router.prefix('/api/user')

// 注册用户
router.post('/register', genValidator(userValidate), async (ctx, next) => {
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

// 用户登录
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body // 获取参数
    ctx.body = await login(ctx, userName, password) // 调用路由方法，记住需要传ctx！！！
})

// 删除
router.post('/delete', loginCheck, async (ctx, next) => {
    if (isTest) { // 在测试环境下
        const { userName } = ctx.session.userInfo // 且只能删除自己
        ctx.body = await deleteCurUser(userName)
    }
})

module.exports = router