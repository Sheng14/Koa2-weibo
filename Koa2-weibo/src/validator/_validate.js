/**
 * @description 公用校验工具函数
 * @author Sheng14
 */

const Ajv = require('ajv') // 引入插件
const ajv = new Ajv({ // 实例化
    //allErrors: true // 允许输出所有的错误，但是太慢了所以不要
})


/**
 * 数据校验的公用函数
 * @param {Object} schema 校验规则
 * @param {Object} data 被校验的数据
 */
function validate(schema, data = {}) { // 需要接收规则和数据
    const valid = ajv.validate(schema, data)
    if (!valid) {
        return ajv.errors[0] // 如果里面没有数据，说明校验有问题，返回第一个错误，否则就返回undefined！
    }
}

module.exports = {
    validate
}    