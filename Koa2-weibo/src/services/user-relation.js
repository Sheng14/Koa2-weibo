/**
 * @description 处理用户关系表数据库
 * @author Sheng14
 */

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')

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
                    followerId // 首先根据当前用户的id拿到对于粉丝的id
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

module.exports = {
    getUsersByFollower
}