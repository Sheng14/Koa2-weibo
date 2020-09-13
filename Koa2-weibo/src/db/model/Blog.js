/**
 * @description 微博数据模型
 * @author Sheng14
 */

const seq = require('../seq') // 引入实例
const { INTEGER, STRING, TEXT } = require('../type') // 引入类型

const Blog = seq.define('blog', { // 创建数据模型
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 ID'
    },
    content: {
        type: TEXT,
        allowNull: false,
        comment: '微博内容'
    },
    image: {
        type: STRING,
        comment: '图片地址'
    }
})

module.exports = Blog // 这里似乎只能使用这种形式，如果是{}的话不会被当成是数据模型，那么index那里就用不了belongsTo了！
