/**
 * @description 注册方面操作数据库
 * @author Sheng14
 */

const { User } = require('../db/model/index') // 引入模型
const { formatUser } = require('../services/_format') // 引入格式化函数 
const { getFollowers } = require('../controller/user-relation')
const { addFollower } = require('./user-relation')
 /**
  * 获取用户信息
  * @param {string} userName 用户名
  * @param {string} password 密码
  */
async function getUserInfo (userName, password) {
    let whereOpt = {
        userName
    } // 定义查询条件
    if (password) { // 如果有传password，加多一个查询条件
        Object.assign(whereOpt, { password })
    }
    const result = await User.findOne({ // 查询数据库 一定不能忘记await啊啊啊啊！
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })

    if (result == null) { // 如果查不到直接返回即可
        return result
    }

    //  如果查得到就把值返回且格式化
    const formatResult = formatUser(result.dataValues)
    return formatResult
}

/**
 * 创建用户
 * @param {string} userName 用户名 
 * @param {string} password 密码
 * @param {number} gender 性别 
 * @param {string} nickName 昵称 
 */
async function createUser ({ userName, password, gender=3, nickName }) {
    const result = await User.create({
        userName,
        password,
        nickName:　nickName? nickName : userName,
        gender
    })
    const data = result.dataValues
    // 自己关注自己
    addFollower(data.id, data.id) 
    return data
}

/**
 * 删除用户
 * @param {String} userName 用户名 
 */
async function deleteUser(userName) {
    const result = await User.destroy({
        where: {
            userName // 删除对应用户名的数据
        }
    })
    return result > 0 // 返回的是受影响的函数，与0比返回一个布尔值！
}


/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function updateUser (
    { newPassword, newNickName, newPicture, newCity },
    { userName, password }
) {
    // 拼接修改的内容
    const updateData = {}
    if (newPassword) {
        updateData.password = newPassword
    }
    if (newNickName) {
        updateData.nickName = newNickName
    }
    if (newPicture) {
        updateData.picture = newPicture
    }
    if (newCity) {
        updateData.city = newCity
    }

    // 拼接查询条件
    const whereData = {
        userName
    }
    if (password) {
        whereData.password = password
    }

    // 执行更新
    const result = await User.update(updateData, {
        where: whereData
    })
    
    return result[0] > 0
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
}