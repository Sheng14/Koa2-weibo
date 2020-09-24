/**
 * @description 微博首页路由
 * @author Sheng14
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { create } = require('../../controller/blog-home')
const { genValidator } = require('../../middlewares/validator') // 引入生成校验中间件
const { blogValidate } = require('../../validator/blog') // 引入校验规则
const { getHomeBlogList } = require('../../controller/blog-home')
const { getBlogListStr} = require('../../utils/blog')

router.prefix('/api/blog')

// 创建微博路由
router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
    const { content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo // 获取参数
    ctx.body = await create({
        content,
        image,
        userId
    })
})

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let { pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)  // 转换 number 类型
    const { id: userId } = ctx.session.userInfo
    const result = await getHomeBlogList(userId, pageIndex)
    // 渲染模板
    result.data.blogListTpl = getBlogListStr(result.data.blogList)

    ctx.body = result
})

module.exports = router