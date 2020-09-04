/**
 * @description 连接和同步数据库
 * @author Sheng14
 */
const seq = require('./seq')
// require('./model') // 因为暴露的不是表而是整个定义的表所以直接引用就行，相当于把seq.define拿出来
require('./model/index') // 引入模型的入口文件

seq.authenticate() // 测试连接（返回的是promise）
    .then(() => {
        console.log('ok')
    })
    .catch(() => {
        console.log('err')
    })

seq.sync({ force: true }).then(() => { // 强制同步（然后有重复会覆盖）
    console.log('sync ok')
    process.exit() // 完成后会自动退出
})

// 这里负责连接和同步到数据库