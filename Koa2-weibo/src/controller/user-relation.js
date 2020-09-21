/**
 * @description 处理用户关系表的逻辑
 * @author Sheng14
 */

const { getUsersByFollower } = require('../services/user-relation') 
const { SuccessModel, ErrnoModel } = require('../model/ResModel')
const { addFollowerFailInfo } = require('../model/Errnoinfo')
const { addFollower } = require('../services/user-relation')

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

/**
 * 添加关注
 * @param {Number} userId 当前登录用户id
 * @param {Number} followerId 当前主页用户id
 */
async function follow (myUserId, curUserId) {
    try {
        await addFollower(myUserId, curUserId)
        return new SuccessModel()
    } catch(ex) {
        console.log(ex)
        return new ErrnoModel(addFollowerFailInfo)
    }
}


module.exports = {
    getFans,
    follow
}