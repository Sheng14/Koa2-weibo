const { User } = require('./model')

!(async function() {
    const updateRes = await User.update({ // 传入要修改的内容和条件两个参数即可
        nickName: '帝国'
    },{
        where: {
            id: 1
        }
    })
    console.log(updateRes[0]) // 1
})()
// 这里就是来更新信息的
/*
Executing (default): UPDATE `users` SET `nickName`=?,`updatedAt`=? WHERE `id` = ?
1
 */