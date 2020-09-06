/**
 * @description 加密
 * @author Sheng14
 */

const ctypto = require('crypto') // 引入加密模块
const { CRYPTO_SECRET_KEY } = require('../conf/secretKeys') // 引入密匙

/**
 * md5加密工具函数
 * @param {String} content 明文
 */
function _md5(content) {
    const md5 = ctypto.createHash('md5')
    return md5.update(content).digest('hex')
}

/**
 * 直接可以调用的加密函数
 * @param {String} content 明文 
 */
function doCtypto(content) {
    const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
    return _md5(str)
}

module.exports = {
    doCtypto
}