/**
 * @description 微博页面路由
 * @author Sheng14
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getFans } = require('../../controller/user-relation')
const { isExist } = require('../../controller/user')

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
        // 已登录用户的信息(自己的名字)
        const myUserInfo = ctx.session.userInfo
        const myUserName = myUserInfo.userName // 所以myUserName必定是自己，这个登录的用户，而curUserName根据访问的主页不同显示的当前用户

    // 获取当前个人主页的用户名（才能知道具体是查谁，就不一定是自己的，可能访问了别的用户）
    let curUserInfo
    const { userName: curUserName } = ctx.params
    const isMe = myUserName === curUserName
    if (isMe) {
        // 是当前登录用户
        curUserInfo = myUserInfo
    } else {
        // 不是当前登录用户
        const existResult = await isExist(curUserName)
        if (existResult.errno !== 0) {
            // 用户名不存在
            return
        }
        // 用户名存在
        curUserInfo = existResult.data
    }

    // 调用函数拿到需要的各种数据(获取微博第一页数据)
    const result = await getProfileBlogList(curUserName, 0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data // 少传了一个data妈的
    console.log('router' + blogList)

    // 获取粉丝（直接去调用controller里面的数据即可，粉丝是当前主页用户的粉丝）
    const fansResult = await getFans(curUserInfo.id)
    const { count: fansCount, fansList } = fansResult.data // 加上fans以示区别，不然会与其它的冲突（count故意没有返回fans开头，展示解构重命名）

    // 判断当前用户（我自己）在访问其它用户的时候，我是否关注了这个用户
    const amIFollowed = fansList.some((item) => {
        return item.userName === myUserName
    })

    // 返回给前端模板
    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count,
            curUserName
        },
        userData: {
            userInfo: curUserInfo,
            isMe,
            amIFollowed,
            fansData: {
                count: fansCount,
                list: fansList
            }
        }
    })
})

router.get('/square', loginRedirect, async (ctx, next) => {
    // 获取微博第一页
    const result = await getSquareBlogList(0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data
    await ctx.render('square', {
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