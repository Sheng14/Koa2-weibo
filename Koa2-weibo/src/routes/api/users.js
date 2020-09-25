/**
 * @description 处理注册和是否重名的路由
 * @author Sheng14
 */

const router = require('koa-router')()
const { isExist, register, login, deleteCurUser, changeUserInfo, changePassword, logout } = require('../../controller/user')
const { userValidate } = require('../../validator/user') // 引入校验函数
const { genValidator } = require('../../middlewares/validator') // 引入可添加校验函数的校验中间件
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginChecks')
const { getFollowers } = require('../../controller/user-relation')
const user = require('../../services/user')

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

// 更新用户信息
router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body
    ctx.body = await changeUserInfo(ctx, { nickName, city, picture })
})


// 修改密码
router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const { password, newPassword } = ctx.request.body
    const { userName } = ctx.session.userInfo // 获取需要的参数然后直接调用controller的函数更新密码即可
    ctx.body = await changePassword(userName, password, newPassword)
})

// 退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
    ctx.body = await logout(ctx)
})


// 获取关注人（即at）的列表
router.get('/getAtList', loginCheck, async (ctx, next) => {
    const { id: userId } = ctx.session.userInfo
    const result = await getFollowers(userId)
    const { followersList } = result.data // 获取关注人的列表
    const list = followersList.map(user => {
        return `${user.nickName} - ${user.userName}`
    }) // 处理关注人列表变成字符串数组
    ctx.body = list
})

module.exports = router