const Sequelize = require('sequelize') // 引入该库

const conf = {
    host: 'localhost',
    dialect: 'mysql'
} // 配置项抽离出来

const seq = new Sequelize('koa2_weibo_db', 'root', '', conf) // 实例化:数据库、用户名、密码、配置

/*seq.authenticate() // 测试连接（返回的是promise）
.then(() => {
    console.log('ok')
})
.catch(() => {
    console.log('err')
})*/

module.exports = seq //所以这个文件就只是负责实例化一个sequelize即可