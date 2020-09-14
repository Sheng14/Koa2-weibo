/**
 * @description 微博首页的逻辑
 * @author Sheng14
 */

const { SuccessModel, ErrnoModel } = require('../model/ResModel')
const { createBlog } = require('../services/blog')
const { createBlogFailInfo } = require('../model/Errnoinfo')
const xss = require('xss')

/**
 * 创建微博
 * @param {Objec} param0 
 */
async function create ({ content, image, userId }) {
    try {
        const blog = await createBlog({
            content: xss(content), // 预防xss攻击
            image,
            userId
        })
        return new SuccessModel(blog)
    } catch(ex) {
        console.error(ex.message, ex.stack)
        return new ErrnoModel(createBlogFailInfo)
    }
}

module.exports = {
    create
}