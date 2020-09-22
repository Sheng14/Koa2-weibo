/**
 * @description 处理用户关系表的逻辑
 * @author Sheng14
 */

const { getUsersByFollower, getFollowersByUser } = require('../services/user-relation') 
const { SuccessModel, ErrnoModel } = require('../model/ResModel')
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/Errnoinfo')
const { addFollower, deleteFollower } = require('../services/user-relation')

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
 * 根据当前主页用户获取该用户的关注人列表
 * @param {Number} userId 当前主页的用户
 */
async function getFollowers (userId) {
    const { count, userList } = await getFollowersByUser(userId)
    return new SuccessModel({
        count,
        followersList: userList
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

/**
 * 取消关注
 * @param {number} myUserId 当前登录的用户 id
 * @param {number} curUserId 要被关注的用户 id
 */
async function unFollow(myUserId, curUserId) {
    const result = await deleteFollower(myUserId, curUserId)
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(deleteFollowerFailInfo)
}

module.exports = {
    getFans,
    follow,
    unFollow,
    getFollowers
}