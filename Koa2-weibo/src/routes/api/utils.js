/**
 * @description 文件上传接口
 * @author Sheng14
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { saveFile } = require('../../controller/utils')
const koaFrom = require('formidable-upload-koa') // 暂存文件的插件

router.prefix('/api/utils') // 前缀

// 上传文件的路由
router.post('/upload', loginCheck, koaFrom(), async (ctx, next) => { // 登录验证、暂存到服务器
   const file = ctx.req.files['file'] // 这个方法是插件规定的，直接通过这个和我们前端ajax请求时对应的key即file即可拿到整个文件
    if (!file) {
        return
    }
    const { size, path, name, type } = file // 拿到文件的一些信息
    ctx.body = await saveFile({ // 传入信息丢给controller处理
        name,
        type,
        size,
        filePath: path
    })
})

module.exports = router