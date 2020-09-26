/**
 * @description 获取@数量
 * @author Sheng14
 */

const { getAtRelationCount, getAtUserBlogList} = require('../services/at-relation')
const { SuccessModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../conf/constant')

/**
 * 获取@数量
 * @param {Number} userId 
 */
async function getMeCount (userId) {
    const count = await getAtRelationCount(userId) // 拿到@数量
    return new SuccessModel({
        count
    })
}

/**
 * 获取我未读的微博信息
 * @param {Number} userId 
 * @param {Number} pageIndex 
 */
async function getAtMeBlogList (userId, pageIndex = 0) {
    const result = await getAtUserBlogList({
        userId,
        pageIndex,
        pageSize: PAGE_SIZE
    })
    const { count, blogList } = result

    // 返回
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })    
}

module.exports = {
    getMeCount,
    getAtMeBlogList
}