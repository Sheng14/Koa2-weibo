/**
 * @description 单元测试demo
 * @author Sheng14
 */

function add (a, b) {
    return a+b
}

test('10+20应该等于30', () => {
    const res = add(10, 20)
    expect(res).toBe(30)
})

test('10+50不应该等于20', () => {
    const res = add(10, 50)
    expect(res).not.toBe(20)
})