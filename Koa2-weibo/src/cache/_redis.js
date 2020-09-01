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
 
/**
 * 
 * @param {string} key 键
 * @param {string} value  值
 * @param {number} timeout  过期时间 单位为s
 */
function set (key, value, timeout = 60*60) {
    if (typeof value === 'object') { // 如果值是对象我们转化为字符串
        JSON.stringify(value)
    }
    redisClient.set(key, value)
    redisClient.expire(key, timeout) // 设置过期时间
}

/**
 * 
 * @param {string} key 键
 */
function get (key) { // 拿取redis中的键值，node.js从redis中拿数据本质上还是属于IO操作故异步
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val == null) {
                resolve(null)
                return
            }
            try{
                resolve(JSON.parse(val)) // 尝试对值进行对象化，因为前面可能字符串化了，当然也可能失败就直接返回即可
            } catch(ex) {
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = {
    set,
    get
}