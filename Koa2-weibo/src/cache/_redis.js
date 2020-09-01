/**
 * @description 连接redis的方法：get、set
 * @author Sheng14
 */

 const redis = require('redis')
 const { REDIS_CONF } = require('../conf/db')

 // 创建客户端
 const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

 // 监听错误
 redisClient.on('error', (error) => {
    console.log('redis error', error)
 })