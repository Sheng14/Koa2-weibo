/**
 * @description 实例化sequelize
 * @author Sheng14
 */
const Sequelize = require('sequelize') // 引入该库
const { MYSQL_CONF } = require('../conf/db') // 引入数据库配置
const { isPrd, isTest } = require('../utils/env') // 引入环境变量设置

const { host, user, password, database } = MYSQL_CONF
const conf = {
    host,
    dialect: 'mysql'
} // 配置项抽离出来

// 单元测试状态下不打印sequelize中的sql语句等
if (isTest) {
    conf.logging = () => {}
}

// 配置线上连接池环境
if (isPrd) {
    conf.pool = {
        max: 3, // 最大连接数量
        min: 0, // 最小连接数量
        idle: 10000 // 超过10000毫秒没有连接就释放
    }
}

const seq = new Sequelize(database, user, password, conf) // 实例化:数据库、用户名、密码、配置

/*seq.authenticate() // 测试连接（返回的是promise）
.then(() => {
    console.log('ok')
})
.catch(() => {
    console.log('err')
})*/

module.exports = seq //所以这个文件就只是负责实例化一个sequelize即可