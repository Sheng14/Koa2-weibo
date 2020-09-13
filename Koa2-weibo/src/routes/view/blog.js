/**
 * @description 微博页面路由
 * @author Sheng14
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')

router.get('/', loginRedirect, async (ctx, next) => { // 真正的微博首页
    await ctx.render('index', {})
})

module.exports = router