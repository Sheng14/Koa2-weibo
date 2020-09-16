/**
 * @description 微博页面路由
 * @author Sheng14
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')

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
    // 获取当前个人主页的用户名（才能知道具体是查谁）
    const { userName: currentName } = ctx.params

    // 调用函数拿到需要的各种数据
    const result = await getProfileBlogList(currentName, 0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result
    // 返回给前端模板
    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})

module.exports = router