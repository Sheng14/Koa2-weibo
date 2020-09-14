/**
 * @description 微博的格式校验
 * @author Sheng14
 */

const { validate } = require('./_validate')

// 定义校验规则
const SCHEMA = {
    type: 'object',
    properties: {
       content: {
           type: 'string'
       },
       image: {
           type: 'string',
           maxLength: 255
       }
    }
}

/**
 * 校验微博数据
 * @param {Object} data 被校验的微博数据 
 */
function blogValidate (data = {}) { // 只需要接收路由传来的数据，规则在上面
    return validate(SCHEMA, data)
}

module.exports = {
    blogValidate
}