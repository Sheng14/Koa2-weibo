/**
 * @description 创建@用户关系
 * @author Sheng14
 */

const { AtRelation } = require('../db/model/index')

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

module.exports = {
    createAtRelation,
    getAtRelationCount
}