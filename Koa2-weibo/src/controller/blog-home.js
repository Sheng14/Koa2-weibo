/**
 * @description 微博首页的逻辑
 * @author Sheng14
 */

const { SuccessModel, ErrnoModel } = require('../model/ResModel')
const { createBlog, getFollowersBlogList } = require('../services/blog')
const { createBlogFailInfo } = require('../model/Errnoinfo')
const xss = require('xss')
const { PAGE_SIZE } = require('../conf/constant')

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


async function getHomeBlogList (userId, pageIndex = 0) {
    const res = await getFollowersBlogList({userId, pageIndex, PAGE_SIZE})
    const { count, blogList } = res
    console.log('c', blogList)
    return new SuccessModel({ // 返回前端首页需要的数据
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}

module.exports = {
    create,
    getHomeBlogList
}