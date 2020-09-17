/**
 * @description 个人主页测试
 * @author Sheng14
 */

const server = require('../server')
const { COOKIE, USER_NAME } = require('../testUserInfo') // 获取测试的常量值用户名和cookie

test('测试个人主页加载第一条数据，应该成功', async () => {
    const res = await server
        .get(`/api/profile/loadMore/${USER_NAME}/0`) // 假设测试的是测试用户名的第一页微博数据
        .set('cookie', COOKIE) // 设置cookie
    expect(res.body.errno).toBe(0) // 希望这个请求并不会错误

    const data = res.body.data // 测试这个数据是否包含以下所有的属性
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('count')
})