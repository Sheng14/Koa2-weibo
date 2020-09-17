/**
 * @description 微博数据处理相关工具
 * @author Sheng14
 */

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

// 获取渲染成什么样子的模板文件并且转换成字符串
const BLOG_LIST_TPL = fs.readFileSync(
    path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
).toString()

/**
 * 融合ejs模板字符串和数据返回一个html文件
 * @param {Array} blogList 微博数据 
 * @param {Boolean} canReply 能否回复
 */
function getBlogListStr (blogList=[], canReply=false) {
    return ejs.render( // 需要传入ejs模板、数据、可选项
        BLOG_LIST_TPL,
        {
            blogList,
            canReply
        }
    )
}

module.exports = {
    getBlogListStr
}