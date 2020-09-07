/**
 * @description 注册和登录路由
 * @author Sheng14
 */

const router = require('koa-router')()

/**
 * 获取用户登录信息（为后面判断用户登录状态做准备）
 * @param {Object} ctx koa2 ctx 
 */
function getLoginInfo(ctx) {
    let data = {
        isLogin: false
    }
    if (ctx.session.userInfo) {
        data = {
            isLogin: true,
            userName: ctx.session.userInfo.userName
        }
    }
    return data
}

// 登录路由 需要传递用户登录与否的信息，好给前端判断并且阻止重复登录/注册
router.get('/login', async (ctx, next) => {
    await ctx.render('login', getLoginInfo(ctx))
})

// 注册路由（暂时不传参数）
router.get('/register', async (ctx, next) => {
    await ctx.render('register', getLoginInfo(ctx))
})

module.exports = router