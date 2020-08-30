const seq = require('../src/seq')
const Sequelize = require('sequelize')


// 创建user模型/表，表的名字是users
const User = seq.define('user', { // user是表名（自动变为复数） id自动创建且自增且为主键、createAt和updateAt也是自动创建
    userName: {
        type: Sequelize.STRING, // 即所谓的varchar（255）
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nickName: {
        type: Sequelize.STRING
    }
})

// 创建blog模型/表，表的名字是blogs
const Blog = seq.define('blog', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

// 关联外键（两种方法都可以，都写有利于查询）
Blog.belongsTo(User, {
    foreignKey: 'userId' //只需要传入自己的外键即可，id是自动默认的
})
User.hasMany(Blog, {
    foreignKey: 'userId' // 只需要传入被关联者的外键即可，id是自动默认的
})

module.exports = {
    User,
    Blog
}
// 所以这里就是负责定义模型/表