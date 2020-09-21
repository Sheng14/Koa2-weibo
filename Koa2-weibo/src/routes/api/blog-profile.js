/**
 * @description 个人主页API路由
 * @author Sheng14
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListStr } = require('./../../utils/blog')
const { follow } = require('../../controller/user-relation')

router.prefix('/api/profile')

// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
    let { userName, pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)
    const result = await getProfileBlogList(userName, pageIndex) // 拿到具体数据但是不能直接返回
    // 需要将数据渲染变成html字符串返回
    result.data.blogListTpl = getBlogListStr(result.data.blogList)
    ctx.body = result
    /*let { userName, pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)
    const result = await getProfileBlogList(userName, pageIndex)

    // 渲染为 html 字符串
    result.data.blogListTpl = getBlogListStr(result.data.blogList)

    ctx.body = result*/
})


// 关注
router.post('/follow', loginCheck, async (ctx, next) => {
    const { id: myUserId } = ctx.session.userInfo // 获取当前登录用户的id
    const { userId: curUserId } = ctx.request.body // 获取当前主页的用户id
    ctx.body = await follow(myUserId, curUserId)
})


module.exports = router