/**
 * @description 个人主页API路由
 * @author Sheng14
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')

router.prefix('/api/profile')

router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
    let { userName, pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)
    const result = await getProfileBlogList(userName, pageIndex) // 拿到具体数据但是不能直接返回
    // 需要将数据渲染变成html字符串返回
    result.data.blogListTpl = xxx(result.data.blogList)
    ctx.body = result
})

module.exports = router