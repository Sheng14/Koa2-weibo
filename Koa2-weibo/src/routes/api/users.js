/**
 * @description 处理注册和是否重名的路由
 * @author Sheng14
 */

const router = require('koa-router')()
const { isExist } = require('../../controller/user')

router.prefix('/api/user')

router.post('/register', async (ctx, next) => {

})

router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body // 这一层只需要负责获取参数
    // controll 调用controller里面的方法
    ctx.body = await isExist(userName)
    // ctx.body = xxxx 返回数据即可！
})

module.exports = router