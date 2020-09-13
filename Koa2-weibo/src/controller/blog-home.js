/**
 * @description 微博首页的逻辑
 * @author Sheng14
 */

const { SuccessModel, ErrnoModel } = require('../model/ResModel')
const { createBlog } = require('../services/blog')
const { createBlogFailInfo } = require('../model/Errnoinfo')

/**
 * 创建微博
 * @param {Objec} param0 
 */
async function create ({ content, image, userId }) {
    try {
        const blog = await createBlog({
            content,
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