/**
 * @description 测试json路由
 * @author Sheng14
 */

const server = require('./server')
/*
test('json接口返回数据格式正确', async () => {
    const res = await server.get('/json')
    expect(res.body).toEqual({
        title: 'koa2 json'
    })
    expect(res.body.title).toBe('koa2 json')
})*/
function add (a, b) {
    return a+b
}

test('10+20应该等于30', () => {
    const res = add(10, 20)
    expect(res).toBe(30)
})