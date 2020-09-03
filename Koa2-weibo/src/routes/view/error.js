/**
 *  @description 配置404和错误路由
 * @author Sheng14
 */

const router = require('koa-router')()

router.get('/error', async (ctx, next) => { // 监听错误路由，如果出错了直接走error.ejs
    await ctx.render('error')
})

router.get('*', async (ctx, next) => { // 监听404，如果没有路由符合则走404
    await ctx.render('404')
})

module.exports = router