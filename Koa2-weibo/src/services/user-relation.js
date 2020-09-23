const userRelation = require('../controller/user-relation')
/**
 * @description 处理用户关系表数据库
 * @author Sheng14
 */

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')
const Sequelize = require('sequelize')

/**
 * 根据当前用户id去获取它的粉丝们的信息
 * @param {Number} followerId 当前用户id
 */
async function getUsersByFollower (followerId) {
    const reuslt = await User.findAndCountAll({
        arrtibutes: ['id', 'userName', 'nickName', 'picture'], // 再根据粉丝的id查询user表拿到粉丝们的信息
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: UserRelation,
                where: {
                    followerId, // 首先根据当前用户的id拿到对于粉丝的id
                    userId: {
                        [Sequelize.Op.ne]: followerId // 要求我UserRelation表中的的userId不等于followerId
                    }
                }
            }
        ]
    })

    let userList = reuslt.rows.map(row => row.dataValues)
    userList = formatUser(userList)

    return {
        count: reuslt.count,
        userList
    }
}

/**
 * 从数据库查询当前主页用户的关注者信息
 * @param {Number} userId 当前主页用户的id
 */
async function getFollowersByUser (userId) {
    const result = await UserRelation.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['id', 'userName', 'nickName', 'picture']
            }
        ],
        where: {
            userId,
            followerId: {
                [Sequelize.Op.ne]: userId // 要求我UserRelation表中的的userId不等于followerId
            }
        }
    })
    
    let userList = result.rows.map(row => row.dataValues)

    userList = userList.map(item => {
        let user = item.user.dataValues
        user = formatUser(user)
        return user
    })

    return {
        count: result.count,
        userList
    }
}

/**
 * 往用户关系数据库添加一条数据来建立两者的关注
 * @param {Number} userId 当前登录用户id
 * @param {Number} followedId 当前主页用户id
 */
async function addFollower (userId, followerId) { // 其实就往数据库里加数据而已
    const result = await UserRelation.create({
        userId,
        followerId
    })

    return result.dataValues
}

/**
 * 删除关注关系
 * @param {number} userId 用户 id
 * @param {number} followerId 被关注用户 id
 */
async function deleteFollower(userId, followerId) {
    const result = await UserRelation.destroy({
        where: {
            userId,
            followerId
        }
    })
    return result > 0
}

module.exports = {
    getUsersByFollower,
    addFollower,
    deleteFollower,
    getFollowersByUser
}