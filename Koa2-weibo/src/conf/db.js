/**
 * @description 存储配置
 * @author Sheng14
 */

const { isPrd } = require('../utils/env')

let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'koa2_weibo_db'
}

if (isPrd) {
    REDIS_CONF = { // 线上redis配置
        port: 6379,
        host: '127.0.0.1'
    }

    MYSQL_CONF = { // 线上mysql配置
        host: 'localhost',
        user: 'root',
        password: '',
        port: '3306',
        database: 'koa2_weibo_db'
    }
}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}