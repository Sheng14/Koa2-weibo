const blog = require('../../src/services/blog')
/**
 * @description 微博@关系测试
 * @author Sheng14
 */

const server = require('../server')
const {
    A_COOKIE,
    A_ID,
    A_USER_NAME,
    D_COOKIE,
    D_ID,
    D_USER_NAME
} = require('../testUserInfo')

let BLOG_ID // 保存单元测试创建微博的id

test('Dark创建了一个微博，@Ace应该成功', async () => {
    const content = '单元测试自动创建的微博 @Ace - ' + A_USER_NAME
    const res = await server
        .post('/api/blog/create')
        .send({
            content
        })
        .set('cookie', D_COOKIE)
    expect(res.body.errno).toBe(0) // 成功创建微博
    BLOG_ID = res.body.data.id // 保存微博id
})

test('获取Ace的关注列表，应该有刚刚@的微博', async () => {
    const res = await server
        .post('/api/atMe/loadMore/0')
        .set('cookie', A_COOKIE)
    expect(res.body.errno).toBe(0)
    const blogList = red.body.data.blodList // 获取微博列表
    const isHaveCurBlog = blogList.some(blog => blog.id === BLOG_ID) // 判断微博列表是否有一个微博的id和刚刚创建即@的微博id相同就行
    expect(isHaveCurBlog).toBe(true)
})

