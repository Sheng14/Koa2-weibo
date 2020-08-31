const { Blog, User } =  require('./model')

!(async function() {
  // 插入用户
  const diguo = await User.create({
      userName: 'diguo',
      password: '123',
      nickName: '帝国'
  })
  const diguoId = diguo.dataValues.id
  console.log(diguoId)
  console.log(diguo)
  
  const bubing = await User.create({
      userName: 'bubing',
      password: '123',
      nickName: '步兵'
  })
  const bubingId = bubing.dataValues.id
  console.log(bubingId)

  // 插入博客
  const blog1 = await Blog.create({
      title: '标题1',
      content: '内容1',
      userId: diguoId
  })
  console.log(blog1.dataValues)

  const blog2 = await Blog.create({
      title: '标题2',
      content: '内容2',
      userId: diguoId
  })

  const blog3 = await Blog.create({
      title: '标题3',
      content: '内容3',
      userId: bubingId
  })
  
  const blog4 = await Blog.create({
      title: '标题4',
      content: '内容4',
      userId: bubingId
  })
})()