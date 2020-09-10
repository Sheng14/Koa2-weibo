/**
 * @description 用户接口单元测试
 * @author Sheng14
 */

const server = require('../server')

// 定义用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
    userName,
    password,
    nickName: userName,
    gender: 1
}

let COOKIE = '' // 后面用来存储cookie！

// 测试注册
test('注册一个用户，应该成功', async () => {
    const res = await server
        .post('/api/user/register')
        .send(testUser)
    expect(res.body.errno).toBe(0)
})


// 再次测试注册，预防重复注册
test('重复注册用户应该失败', async () => {
    const res = await server
        .post('/api/user/register')
        .send(testUser)
    expect(res.body.errno).not.toBe(0)
})

// 查询用户是否存在
test('查询注册的用户名，应该存在', async () => {
    const res = await server
        .post('/api/user/isExist')
        .send({ userName })
    expect(res.body.errno).toBe(0)
})

// json schema检测
test('json schema检测，非法格式，注册应该失败', async () => {
    const res = await server
        .post('/api/user/register')
        .send({
            userName: '123',
            password: 'a',
            gender: 'male'
        })
    expect(res.body.errno).not.toBe(0)
})

// 登录测试
test('登录应该成功', async () => {
    const res = await server
        .post('/api/user/login')
        .send({
            userName,
            password
        })
    expect(res.body.errno).toBe(0)
    // 获取cookie才能绕过loginCheck，因为删除有loginCheck
    COOKIE = res.headers['set-cookie'].join(';')    
})

// 修改信息测试
test('修改信息应该成功', async () => {
    const res = await server
        .patch('/api/user/changeInfo')
        .send({
            nickName: '哈哈',
            city: '青岛',
            picture: '/picture.png'
        })
        .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
})

// 修改密码测试
test('修改密码应该成功', async () => {
    const res = await server
        .patch('/api/user/changePassword')
        .send({
            password,
            newPassword: 'p1234'
        })
        .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
})

// 删除测试数据
test('删除用户，应该成功', async () => {
    const res = await server
        .post('/api/user/delete')
        .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
})

// 测试退出登录
test('退出登录，应该成功', async () => {
    const res = await server
        .post('/api/user/logout')
        .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
})

// 测试是否真的删除了
test('删除之后，再次查询注册的用户名应该不存在', async () => {
    const res = await server
        .post('/api/user/isExist')
        .send({ userName })
    expect(res.body.errno).not.toBe(0)
})
