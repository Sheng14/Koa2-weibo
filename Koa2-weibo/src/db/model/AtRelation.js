/**
 * @description at关系数据库
 * @author Sheng14
 */

const seq = require('../seq') // 引入实例
const { INTEGER, BOOLEAN } = require('../type') // 引入类型

const AtRelation = seq.define('atRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户Id'
    },
    blogId: {
        type: INTEGER,
        allowNull: false,
        comment: '博客Id'
    },
    isRead: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false, // 默认未读
        comment: '是否阅读'
    }
})

module.exports = AtRelation