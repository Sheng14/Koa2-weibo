/**
 * @description 格式化数据（私有）
 * @author Shneng14
 */

const { DEFAULT_PICTURE }  = require('../conf/constant')

/**
 * 格式化用户头像
 * @param {Object} obj 用户信息
 */
function _formatUserPicture (obj) { // 私有方法交由格式化用户信息一块调用
    if (obj.picture == null) { // 如果用户信息里面没有头则给个头像
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}

/**
 * 格式化用户信息
 * @param {Array/Object} list  多个用户则数组，一个用户则对象
 */
function formatUser(list) {
    if(list == null) {
        return list
    }
    if (list instanceof Array) { // 多个用户时
      return list.map(_formatUserPicture)
    }
    // 单个用户/对象
    return _formatUserPicture(list)
}

module.exports = {
    formatUser
}