/**
 * @description 注册和登录路由
 * @author Sheng14
 */

const router = require('koa-router')()

// 登录路由(暂时不传参数)
router.get('/login', async (ctx, next) => {
    await ctx.render('login', {})
})

// 注册路由（暂时不传参数）
router.get('/register', async (ctx, next) => {
    await ctx.render('register', {})
})

module.exports = router