/**
 * @description 微博首页路由
 * @author Sheng14
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { create } = require('../../controller/blog-home')

router.prefix('/api/blog')

router.post('/create', loginCheck, async (ctx, next) => {
    const { content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo // 获取参数
    ctx.body = await create({
        content,
        image,
        userId
    })
})

module.exports = router