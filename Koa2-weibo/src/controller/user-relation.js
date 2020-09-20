/**
 * @description 处理用户关系表的逻辑
 * @author Sheng14
 */

const { getUsersByFollower } = require('../services/user-relation') 
const { SuccessModel, ErrnoModel } = require('../model/ResModel')

/**
 * 根据当前用户获取粉丝信息
 * @param {String} userId 当前用户 
 */
async function getFans (userId) {
    const { count, userList } = await getUsersByFollower(userId)
    return new SuccessModel({
        count,
        fansList: userList
    })
}

module.exports = {
    getFans
}