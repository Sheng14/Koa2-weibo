/**
 * @description 用户关系单元测试
 * @author Sheng14
 */

const server = require('../server')
const { getFans, getFollowers } = require('../../src/controller/user-relation') // 没有路由就用方法了
const {
    A_COOKIE,
    A_ID,
    A_USER_NAME,
    D_COOKIE,
    D_ID,
    D_USER_NAME
} = require('../testUserInfo')

test('无论关注没，先取消关注，因为可能没有关注，所以执行可能是白执行，所以不用期待成功', async () => {
    const res = await server
        .post( '/api/profile/unFollow')
        .send({ userId: A_ID })
        .set('cookie', D_COOKIE)
    expect(1).toBe(1)
})

test('Dark关注Ace，应该成功', async () => {
    const res = await server
        .post('/api/profile/follow')
        .send({ userId: A_ID})
        .set('cookie', D_COOKIE)
    expect(res.body.errno).toBe(0)
})

test('获取Ace的粉丝列表，里面应该有Dark', async () => {
    const res = await getFans(A_ID)
    const { count, fansList } = res.data
    const hasUserName = fansList.some(fanInfo => {
        return fanInfo.userName === D_USER_NAME
    })
    expect(count > 0).toBe(true)
    expect(hasUserName).toBe(true)
})

// 获取关注人
test('获取Ace的关注人，应该有Dark', async () => {
    const result = await getFollowers(D_ID)
    const { count, followersList } = result.data
    const hasUserName = followersList.some(followerInfo => {
        return followerInfo.userName === A_USER_NAME
    })
    expect(count > 0).toBe(true)
    expect(hasUserName).toBe(true)
})

// 取消关注
test('Dark取消关注Ace，应该成功', async () => {
    const res = await server
        .post('/api/profile/unFollow')
        .send({ userId: A_ID })
        .set('cookie', D_COOKIE)
    expect(res.body.errno).toBe(0)
})

// 获取at关注人列表
test('Dark关注了Ace，关注列表应该有Ace', async () => {
    const res = await server
        .get('/api/user/getAtList')
        .set('cookie', D_COOKIE) // 发送D的cookie查看D的关注人列表
    const atList = res.body // 拿到关注人列表
    const hasUserName = atList.some(item => { // 判断是否有一个关注人是A的用户名
        return item.indexOf(`- ${A_USER_NAME}`) > 0
    })
    expect(hasUserName).toBe(true)
})