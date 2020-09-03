const router = require('koa-router')()
const jwt = require('jsonwebtoken') // 引入加密插件
const { SECRET } = require('../conf/constants') // 引入密匙
const util = require('util') // 引入node.js的util模块
const verify = util.promisify(jwt.verify) // 将jwt的verify解密函数promise化（毕竟await后面要跟promise）

router.prefix('/users')

// 模拟登录接口
router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body
  let userInfo
  if (username === 'diguo' && password === 'abc') { // 如果成功登录则填充登录信息
    userInfo = {
      username: '帝国',
      userId: 4,
      gender: 1, //男
      nickname: 'diguo'
    }
  }

  // 对登录信息进行加密作为token
  let token
  if (userInfo) {
    token = jwt.sign(userInfo, SECRET, { expiresIn: '1h' }) // 三个参数：要加密的内容、密匙、配置项（这里设置了过期时间）
  }

  if (userInfo == null) { // 如果登录信息是空说明没有登录成功
    ctx.body = {
      errno: -1,
      msg: '登录失败'
    }
    return
  } else {
    ctx.body = { // 登录成功则返回token
      errno: 0,
      data: token
    }
  }

})

// 模拟获取用户信息
router.get('/getUserInfo', async (ctx, next) => {
    const token = ctx.header.authorization // 获取到整个Bearer token
    try {
      const payload = await verify(token.split(' ')[1], SECRET) // 利用空格拆开拿到token解密token
      ctx.body = {
        errno: 0,
        data: payload
      }
    } catch(ex) {
      ctx.body = {
        errno: -1,
        msg: 'verify failed'
      }
    }
})

module.exports = router
/*
token:
{
  "errno": 0,
  "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuW4neWbvSIsInVzZXJJZCI6NCwiZ2VuZGVyIjoxLCJuaWNrbmFtZSI6ImRpZ3VvIiwiaWF0IjoxNTk5MTIxNjExLCJleHAiOjE1OTkxMjUyMTF9.3owzBau1Y1GJpMFtbWq_CV2qX7-nsNITlLG9O_KblCs"
}
 */