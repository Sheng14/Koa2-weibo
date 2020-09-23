/**
 * @description 模型们的入口文件（所有模型统一在这里暴露）
 * @author Sheng14
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')

// 关联外键（多对一的关系）
Blog.belongsTo(User, {
    foreignKey: 'userId'
})

UserRelation.belongsTo(User,  {
    foreignKey: 'followerId'
})

User.hasMany(UserRelation, {
    foreignKey: 'userId'
})

Blog.belongsTo(UserRelation, {
    foreignKey: 'userId', // Blog表的userId
    targetKey: 'followerId' // UserRelation的followerId
})

module.exports = {
    User,
    Blog,
    UserRelation
}