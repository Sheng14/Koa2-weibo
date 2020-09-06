/**
 * @description 公用的生成校验中间件的函数
 * @author Sheng14
 */

const { ErrnoModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/Errnoinfo')

/**
 * 生成验证函数对应的中间件
 * @param {function} validateFn 验证函数 
 */
function genValidator(validateFn) { // 这里面放的其实就是一个中间件也就是异步函数啦
    async function validator(ctx, next) {
        const data = ctx.request.body
        const error = validateFn(data) // 执行校验函数
        if (error) {
            ctx.body = new ErrnoModel(jsonSchemaFileInfo) // 校验失败则返回错误模型
            return
        }
        await next() // 否则就执行下一个中间件
    }
    return validator
}

module.exports = {
    genValidator
}