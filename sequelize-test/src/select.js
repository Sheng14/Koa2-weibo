const { Blog, User } = require('./model')

!(async function() {
    // 查询一条记录（得到一个对象）
    const diguo = await User.findOne({
        where: {
            userName: 'diguo'
        }
    })
    console.log(diguo.dataValues)

    // 查询一条记录的某些内容/特定的列（得到只包含特定列的对象）
    const diguoSome = await User.findOne({
        attributes: ['userName', 'nickName'],
        where: {
            userName: 'diguo'
        }
    })
    console.log(diguoSome.dataValues)

    // 查询一个列表即多条记录
    const diguoAll = await Blog.findAll({
        where: {
            userId: '1'
        },
        order: [
            ['id', 'desc']
        ]
    })
    console.log(diguoAll.map((blog) => blog.dataValues))

    // 实现分页
    const diguoList = await Blog.findAll({
        limit: 2, // 限制每次只能查询2条记录
        offset: 2, // 跳过2条记录/1页
        order: [
            ['id', 'desc']
        ]
    })
    console.log(diguoList.map(blog => blog.dataValues))

    // 查询总数
    const diguoCount = await Blog.findAndCountAll({
        limit: 2,
        offset: 2,
        order: [
            ['id', 'desc']
        ]
    })
    console.log(diguoCount.count) // 查询所有记录的总数
    console.log(diguoCount.rows.map((blog) => blog.dataValues)) // 查询当前页的记录的全部内容
})()
// 这个就是负责查询

/* 
Executing (default): SELECT `id`, `userName`, `password`, `nickName`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`userName` = 'diguo' LIMIT 1;
{
  id: 1,
  userName: 'diguo',
  password: '123',
  nickName: '帝国',
  createdAt: 2020-08-31T05:47:56.000Z,
  updatedAt: 2020-08-31T05:47:56.000Z
}



Executing (default): SELECT `userName`, `nickName` FROM `users` AS `user` WHERE `user`.`userName` = 'diguo' LIMIT 1;
{ userName: 'diguo', nickName: '帝国' }



Executing (default): SELECT `id`, `title`, `content`, `userId`, `createdAt`, `updatedAt` FROM `blogs` AS `blog` WHERE `blog`.`userId` = '1' ORDER BY `blog`.`id` DESC;
[
  {
    id: 2,
    title: '标题2',
    content: '内容2',
    userId: 1,
    createdAt: 2020-08-31T05:47:57.000Z,
    updatedAt: 2020-08-31T05:47:57.000Z
  },
  {
    id: 1,
    title: '标题1',
    content: '内容1',
    userId: 1,
    createdAt: 2020-08-31T05:47:57.000Z,
    updatedAt: 2020-08-31T05:47:57.000Z
  }
]




Executing (default): SELECT `id`, `title`, `content`, `userId`, `createdAt`, `updatedAt` FROM `blogs` AS `blog` ORDER BY `blog`.`id` DESC LIMIT 2, 2;
[
  {
    id: 2,
    title: '标题2',
    content: '内容2',
    userId: 1,
    createdAt: 2020-08-31T05:47:57.000Z,
    updatedAt: 2020-08-31T05:47:57.000Z
  },
  {
    id: 1,
    title: '标题1',
    content: '内容1',
    userId: 1,
    createdAt: 2020-08-31T05:47:57.000Z,
    updatedAt: 2020-08-31T05:47:57.000Z
  }
]


Executing (default): SELECT count(*) AS `count` FROM `blogs` AS `blog`;
Executing (default): SELECT `id`, `title`, `content`, `userId`, `createdAt`, `updatedAt` FROM `blogs` AS `blog` ORDER BY `blog`.`id` DESC LIMIT 2, 2;
4
[
  {
    id: 2,
    title: '标题2',
    content: '内容2',
    userId: 1,
    createdAt: 2020-08-31T05:47:57.000Z,
    updatedAt: 2020-08-31T05:47:57.000Z
  },
  {
    id: 1,
    title: '标题1',
    content: '内容1',
    userId: 1,
    createdAt: 2020-08-31T05:47:57.000Z,
    updatedAt: 2020-08-31T05:47:57.000Z
  }
]
*/