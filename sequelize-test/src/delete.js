const { Blog, User } = require('./model')

!(async function() {
    const deleteBlog = await Blog.destroy({
        where: {
            id:1
        }
    })
    console.log(deleteBlog[0]) // undefined
    console.log(deleteBlog) // 1

    const deleteUser = await User.destroy({
        where: {
            id: 1
        }
    })
    console.log(deleteUser[0]) // undefined
    console.log(deleteUser) // 1
})()
// 这里是删除的