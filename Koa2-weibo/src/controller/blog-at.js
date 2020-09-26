/**
 * @description 获取@数量
 * @author Sheng14
 */

const { getAtRelationCount } = require('../services/at-relation')
const { SuccessModel } = require('../model/ResModel')

/**
 * 获取@数量
 * @param {Number} userId 
 */
async function getMeCount (userId) {
    const count = await getAtRelationCount(userId) // 拿到@数量
    return new SuccessModel({
        count
    })
}

module.exports = {
    getMeCount
}