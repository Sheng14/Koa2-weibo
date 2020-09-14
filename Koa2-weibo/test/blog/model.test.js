/**
 * @description 微博数据模型测试
 * @author Sheng14
 */

const { Blog } = require('../../src/db/model/index')

test('验证微博数据模型各个属性，应该符合预期', () => {
    const blog = Blog.build({
        userId: 1,
        content: '微博内容',
        image: '/test.png'
    })
    expect(blog.userId).toBe(1)
    expect(blog.content).toBe('微博内容')
    expect(blog.image).toBe('/test.png')
})