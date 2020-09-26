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

module.exports = {
    createAtRelation
}