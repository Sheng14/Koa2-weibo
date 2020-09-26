/**
 * @description 微博首页的逻辑
 * @author Sheng14
 */

const { SuccessModel, ErrnoModel } = require('../model/ResModel')
const { createBlog, getFollowersBlogList } = require('../services/blog')
const { createBlogFailInfo } = require('../model/Errnoinfo')
const xss = require('xss')
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../conf/constant')
const { getUserInfo } = require('../services/user')
const { createAtRelation } = require('../services/at-relation')

/**
 * 创建微博
 * @param {Objec} param0 
 */
async function create ({ content, image, userId }) {
    const atUserNameList = [] // 创建一个数组保存一个微博里面@出现的用户名
    content = content.replace( // 假装替换其实是为了拿到里面的用户名
        REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            atUserNameList.push(userName)
            return matchStr // 还是返回它本身，所以并没有替换
        }
    )
    // 根据用户名去拿到对应的用户信息（因为多个用户名所以其实是要调用多次所以就用all）
    const atUserList = await Promise.all(
        atUserNameList.map(userName => getUserInfo(userName))
    )
    // 再从用户信息拿到我们的用户id
    const atUserIdList = atUserList.map(user => user.id)

    try {
        // 创建微博
        const blog = await createBlog({
            content: xss(content), // 预防xss攻击
            image,
            userId
        })
        // 有了用户id（同样可能多个用户所以依然all），和博客id（从上面创建博客的对象里面拿）就可以创建@关系了
        await Promise.all(atUserIdList.map(
            userId => createAtRelation(userId, blog.id)
        )) // 所以就是为了发表博客有@的时候记清楚这条博客对应的用户（体现到数据库就是多条记录同样的博客id不一样的用户id）

        return new SuccessModel(blog)
    } catch(ex) {
        console.error(ex.message, ex.stack)
        return new ErrnoModel(createBlogFailInfo)
    }
}

/**
 * 获取微博首页数据
 * @param {Number} userId 
 * @param {Number} pageIndex 
 */
async function getHomeBlogList (userId, pageIndex = 0) {
    const res = await getFollowersBlogList({userId, pageIndex, pageSize: PAGE_SIZE})
    const { count, blogList } = res
    return new SuccessModel({ // 返回前端首页需要的数据
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}

module.exports = {
    create,
    getHomeBlogList
}