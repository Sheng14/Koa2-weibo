/**
 * @description 微博的数据库操作
 * @author Sheng14
 */

const { Blog } = require('../db/model/index')
 
/**
 * 创建微博
 * @param {Object} param0 创建微博的数据
 */
async function createBlog ({ content, image, userId }) {
    const result = await Blog.create({
        content,
        image,
        userId
    })
    return result.dataValues
}

module.exports =  {
    createBlog
}