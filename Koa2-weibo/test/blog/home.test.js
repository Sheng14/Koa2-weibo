/**
 * @description 微博首页
 * @author Sheng14
 */

const server = require('../server')
const { COOKIE } = require('../testUserInfo')

let BLOG_ID = ''

test('创建一条微博，应该成功', async () => {
    // 定义测试的内容
    const content = '单元测试创建的微博' + Date.now()
    const image = '/xxx.png'

    // 进行测试
    const res = await server
        .post('/api/blog/create')
        .send({
            content,
            image
        })
        .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)
    
    // 记录当前微博id
    BLOG_ID = res.body.data.id
})
