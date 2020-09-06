/**
 * @description 处理注册方面的具体业务逻辑
 * @author Sheng14
 */

const { SuccessModel, ErrnoModel } = require('../model/ResModel')
const { getUserInfo, createUser } = require('../services/user')
const { 
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo
} = require('../model/Errnoinfo')
/**
 * 用户名是否存在
 * @param {string} username 
 */
async function isExist (userName) {
    // 业务逻辑处理（无）
    // 调用services
    const userInfo = await getUserInfo(userName)
    // 统一返回格式
    if (userInfo) { // 存在说明用户已经注册，返回用户信息，但是前端会发现是正确模型则显示已经注册
       return new SuccessModel(userInfo)
    } else { // 不存在则说明用户没有注册，返回错误信息，则前端可以根据错误信息提示用户名未注册则可以用！
        return new ErrnoModel(registerUserNameNotExistInfo)
    }
}

/**
 * 用户注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {Number} gender 性别
 */
async function register ({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new ErrnoModel(registerUserNameExistInfo)
    } // 再次判断用户名是否已经被注册，防止前端没有调用isExist的情况
    try {
        await createUser({ // 调用service层的创建用户方法注入数据库
            userName,
            password,
            gender
        })
        return new SuccessModel()
    } catch(ex) {
        console.log(ex.message, ex.stack)
        return new ErrnoModel(registerFailInfo)
    }
}

module.exports = {
    isExist,
    register
}