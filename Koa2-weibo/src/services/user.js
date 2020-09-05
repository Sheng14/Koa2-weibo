/**
 * @description 注册方面操作数据库
 * @author Sheng14
 */

const { User } = require('../db/model/index') // 引入模型
 /**
  * 获取用户信息
  * @param {string} username 用户名
  * @param {string} password 密码
  */
async function getUserInfo (username, password) {
    let whereOpt = {
        username
    } // 定义查询条件
    if (password) { // 如果有传password，加多一个查询条件
        Object.assign(whereOpt, { password })
    }
    const result = User.findOne({ // 查询数据库
        attributes: ['id', 'username', 'nickname', 'picture', 'city'],
        where: whereOpt
    })

    if (result == null) { // 如果查不到直接返回即可
        return result
    }

    // 格式化

    return result.dataValues // 如果查得到就把值返回
}

module.exports = {
    getUserInfo
}