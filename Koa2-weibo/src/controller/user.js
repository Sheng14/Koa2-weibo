/**
 * @description 处理注册方面的具体业务逻辑
 * @author Sheng14
 */

const { SuccessModel, ErrnoModel } = require('../model/ResModel')
const { getUserInfo } = require('../services/user')
const { registerUserNameNotExistInfo } = require('../model/Errnoinfo')
/**
 * 用户名是否存在
 * @param {string} username 
 */
async function isExist (username) {
    // 业务逻辑处理（无）
    // 调用services
    const userInfo = await getUserInfo(username)
    // 统一返回格式
    if (userInfo) { // 存在说明用户已经注册，返回用户信息，但是前端会发现是正确模型则显示已经注册
       return new SuccessModel(userInfo)
    } else { // 不存在则说明用户没有注册，返回错误信息，则前端可以根据错误信息提示用户名未注册则可以用！
        return new ErrnoModel(registerUserNameNotExistInfo)
    }
}

module.exports = {
    isExist
}