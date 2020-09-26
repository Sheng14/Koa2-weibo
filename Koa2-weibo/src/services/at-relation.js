/**
 * @description 创建@用户关系
 * @author Sheng14
 */

const { AtRelation, Blog, User } = require('../db/model/index')
const { formatBlog, formatUser } = require('./_format')

/**
 * 创建微博@用户的关系
 * @param {Number} userId 
 * @param {Number} blogId 
 */
async function createAtRelation (userId, blogId) {
    const result = await AtRelation.create({
        userId,
        blogId
    })

    return result.dataValues
}

/**
 * 获取AtRelation模型里面@的数量
 * @param {Number} userId 
 */
async function getAtRelationCount (userId) {
    const result = await AtRelation.findAndCountAll({
        where: {
            userId,
            isRead: false
        } // 要求是当前用户且未读的@记录
    })
    return result.count
}

/**
 * 获取微博信息
 * @param {Object} param0 
 */
async function getAtUserBlogList ({ userId, pageIndex, pageSize = 10 }) {
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: AtRelation,
                attributes: ['userId', 'blogId'],
                where: { userId }
            },
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture']
            }
        ]
    })
    // 格式化
    let blogList = result.rows.map(row => row.dataValues)
    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        blogItem.user = formatUser(blogItem.user.dataValues)
        return blogItem
    })

    return {
        count: result.count,
        blogList
    }
}

module.exports = {
    createAtRelation,
    getAtRelationCount,
    getAtUserBlogList
}