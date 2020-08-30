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

module.exports = {
    User
}
// 所以这里就是负责定义模型/表