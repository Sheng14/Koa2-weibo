/**
 * @description 模型们的入口文件（所有模型统一在这里暴露）
 * @author Sheng14
 */

const User = require('./User')
const Blog = require('./Blog')

// 关联外键（多对一的关系）
Blog.belongsTo(User, {
    foreignKey: 'userId'
})


module.exports = {
    User,
    Blog
}