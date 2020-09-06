/**
 * @description 校验规则
 * @author Sheng14
 */

const { validate } = require('./_validate')

// 定义校验规则
const SCHEMA = {
    type: 'object',
    properties: {
        userName: {
            type: 'string',
            pattern: '^[a-zA-Z][a-zA-Z0-9_]+$', // 字母开头，字母数字下划线
            maxLength: 255,
            minLength: 2
        },
        password: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        },
        newPassword: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        },
        nickName: {
            type: 'string',
            maxLength: 255
        },
        picture: {
            type: 'string',
            maxLength: 255
        },
        city: {
            type: 'string',
            maxLength: 255,
            minLength: 2
        },
        gender: {
            type: 'number',
            minimum: 1,
            maximum: 3
        }
    }
}

/**
 * 校验用户信息
 * @param {Object} data 被校验的用户数据 
 */
function userValidate (data = {}) { // 只需要接收路由传来的数据，规则在上面
    return validate(SCHEMA, data)
}

module.exports = {
    userValidate
}