/**
 * @description 用户关系模型
 * @author Sheng14
 */

const seq = require('../seq')
const { INTEGER } = require('../type')

const UserRelation = seq.define('userRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    followerId: {
        type: INTEGER,
        allowNull: false,
        comment: '关注者id'
    }
})

module.exports = UserRelation