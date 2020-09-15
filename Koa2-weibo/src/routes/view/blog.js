/**
 * @description 微博页面路由
 * @author Sheng14
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')

// 首页
router.get('/', loginRedirect, async (ctx, next) => { // 真正的微博首页
    await ctx.render('index', {})
})

// 个人主页（自己）
router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo // 如果直接搜profile的就拿到存在session的用户名判断是谁再跳转到它的页面
    ctx.redirect(`/profile/${userName}`)
})

// 个人主页（动态）
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    await ctx.render('profile', {

    })
})

module.exports = router