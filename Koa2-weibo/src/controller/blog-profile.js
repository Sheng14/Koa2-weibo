/**
 * @description 个人主页微博数据
 * @author Sheng14
 */

const { getBlogListByUser } = require('../services/blog')
const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')

/**
 * 获取当前用户的微博列表
 * @param {String} userName 用户名
 * @param {Number} pageIndex 当前页数
 */
async function getProfileBlogList (userName, pageIndex=0) {
    const result = await getBlogListByUser({
        userName,
        pageIndex,
        pageSize: PAGE_SIZE // 引入默认的展示页数
    })
    const blogList = result.blogList
    
    // 发送给路由
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count
    }) 
}

module.exports = {
    getProfileBlogList
}