/**
 * @description 用户数据模型单元测试
 * @author Sheng14
 */

const { User } = require('../../src/db/model/index') // 引入要验证的用户模型

test('验证User模型的各个属性，确定符合预期', () => {
    const user = User.build({ // 定义一个模型的实例（这里避开了gender，因为它有默认值，刚好测试下有没有生效）
        userName: 'diguo',
        password: '123456',
        nickName: 'hd',
        picture: '/xxx.png',
        city: '潮州'
    })
    // 一个一个去验证属性就行
    expect(user.userName).toBe('diguo')
    expect(user.password).toBe('123456')
    expect(user.nickName).toBe('hd')
    expect(user.picture).toBe('/xxx.png')
    expect(user.gender).toBe(3)
    expect(user.city).toBe('潮州')
})