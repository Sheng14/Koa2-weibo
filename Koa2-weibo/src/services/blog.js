/**
 * @description 微博的数据库操作
 * @author Sheng14
 */

const { Blog, User, UserRelation } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')

/**
 * 创建微博
 * @param {Object} param0 创建微博的数据
 */
async function createBlog ({ content, image, userId }) {
    const result = await Blog.create({
        content,
        image,
        userId
    })
    return result.dataValues
}

/**
 * 根据用户名查询数据
 * @param {Object} param0 查询微博的数据
 */
async function getBlogListByUser ({ userName, pageIndex=0, pageSize=10 }) {
    // User查询条件（默认为空则全部查询）
    const userWhereOpts = {}
    // 如果用户名存在则添加进查询条件
    if (userName) {
        userWhereOpts.userName = userName
    }
    const result = await Blog.findAndCountAll({
        limit: pageSize, // 当前每一页展示的微博数量
        offset: pageSize*pageIndex, // 要跳过多少页
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture'],
                where: userWhereOpts
            }
        ]
    })
    console.log(result) // 结果是一个数组
    let blogList = result.rows.map(row => row.dataValues) // 数组的每一项的dataValues包含bloglist和user模型的数据
    console.log(blogList)
    blogList = formatBlog(blogList)
    blogList = blogList.map(item => { // 将每一个user提出来赋值给bloglist
        const user = item.user.dataValues
        item.user = formatUser(user)
        return item
    })
    return {
        count: result.count,
        blogList
    }
}


/**
 * 获取首页关注人的微博
 * @param {Object} param0 
 */
async function getFollowersBlogList ({userId, pageIndex = 0, pageSize = 10}) {
    const result = await Blog.findAndCountAll({
        limit: pageSize, // 分页
        offset: pageSize * pageIndex, // 跳过多少页
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture']
            },
            {
                model: UserRelation,
                attributes: ['userId', 'followerId'],
                where: {
                    userId
                }
            }
        ]
    })

    // 格式化数据
    let blogList = result.rows.map(row => row.dataValues)
    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        blogItem.user = blogItem.user.dataValues
        blogItem.user = formatUser(blogItem.user)
        return blogItem
    })

    return {
        count: result.count,
        blogList
    }
}

module.exports =  {
    createBlog,
    getBlogListByUser,
    getFollowersBlogList
}