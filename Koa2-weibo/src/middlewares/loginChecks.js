/**
 * @description 抽离登录中间件
 * @author Sheng14
 */

const { SuccessModel, ErrnoModel } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/Errnoinfo')

/**
 * API的登录校验
 * @param {Object} ctx koa2 ctx
 * @param {Object} next koa2 next
 */
async function loginCheck(ctx, next) {
    if (ctx.session && ctx.session.userInfo) { // 如果确实登录就继续往下做
        await next()
        return
    }
    ctx.body = new ErrnoModel(loginCheckFailInfo) // 否则就返回错误信息
}


/**
 * 页面的登录校验
 * @param {Object} ctx koa2 ctx
 * @param {Object} next koa2 next
 */
async function loginRedirect(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        await next()
        return
    }
    const curUrl = ctx.url // 获取当前访问的网址
    ctx.redirect('/login?url=' + encodeURIComponent(curUrl)) // 跳转到登录页后带上之前被获取且编码后的网址
}

module.exports = {
    loginCheck,
    loginRedirect
}