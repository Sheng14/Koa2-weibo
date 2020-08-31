const { Blog, User } = require('./model')

!(async function() {
   /* // 查询一条记录（得到一个对象）
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
    console.log(diguoCount.rows.map((blog) => blog.dataValues)) // 查询当前页的记录的全部内容*/

    // 连表查询1 查询blog全部和user的userName与nickName同时符合userNmae为diguo的情况
    const blogListWithUser = await Blog.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName'],
                where: {
                    userName: 'diguo'
                }
            }
        ]
    })
    console.log(blogListWithUser.rows.map((blog => {
        let blogVal = blog.dataValues
        blogVal.user = blogVal.user.dataValues // 拿到下面的user的值重新赋给user(因为每条blog肯定是要带有user的信息才能区分是谁嘛)
        return blogVal
    })))
    console.log(blogListWithUser.count) // 2是因为我们限制了查询，只针对diguo进行查询（blog和user都是如此，可以去掉where则全部出来）

    // 连表查询2 查询user全部和blog中的title同时符合id为1的情况
    const userListWithBlog = await User.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: Blog,
                attributes: ['title'],
                where: {
                    userId: 1
                }
            }
        ]
    })
    console.log(userListWithBlog.rows.map((user) => {
        let userVal = user.dataValues
       // userVal.blog = userVal.blog.dataValues 错误 
       // 因为user里面不只是一条blog，我这样子做相当于限制死了它只能有一个blog，应该从存放blog的地方blogs数组去找到每一个blog
       userVal.blogs = userVal.blogs.map((blog) => blog.dataValues)
        return userVal
    }))
    console.log(userListWithBlog.count)
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



Executing (default): SELECT count(`blog`.`id`) AS `count` FROM `blogs` AS `blog` INNER JOIN `users` AS `user` ON `blog`.`userId` = `user`.`id` AND `user`.`userName` 
= 'diguo';
Executing (default): SELECT `blog`.`id`, `blog`.`title`, `blog`.`content`, `blog`.`userId`, `blog`.`createdAt`, `blog`.`updatedAt`, `user`.`id` AS `user.id`, `user`.`userName` AS `user.userName`, `user`.`nickName` AS `user.nickName` FROM `blogs` AS `blog` INNER JOIN `users` AS `user` ON `blog`.`userId` = `user`.`id` AND `user`.`userName` = 'diguo' ORDER BY `blog`.`id` DESC;
[
  {
    id: 2,
    title: '标题2',
    content: '内容2',
    userId: 1,
    createdAt: 2020-08-31T05:47:57.000Z,
    updatedAt: 2020-08-31T05:47:57.000Z,
    user: { userName: 'diguo', nickName: '帝国' }
  },
  {
    id: 1,
    title: '标题1',
    content: '内容1',
    userId: 1,
    createdAt: 2020-08-31T05:47:57.000Z,
    updatedAt: 2020-08-31T05:47:57.000Z,
    user: { userName: 'diguo', nickName: '帝国' }
  }
]
2




Executing (default): SELECT count(`user`.`id`) AS `count` FROM `users` AS `user` INNER JOIN `blogs` AS `blogs` ON `user`.`id` = `blogs`.`userId` AND `blogs`.`userId` = 1;
Executing (default): SELECT `user`.`id`, `user`.`userName`, `user`.`password`, `user`.`nickName`, `user`.`createdAt`, `user`.`updatedAt`, `blogs`.`id` AS `blogs.id`, `blogs`.`title` AS `blogs.title` FROM `users` AS `user` INNER JOIN `blogs` AS `blogs` ON `user`.`id` = `blogs`.`userId` AND `blogs`.`userId` = 1 ORDER BY `user`.`id` DESC;
[
  {
    id: 1,
    userName: 'diguo',
    password: '123',
    nickName: '帝国',
    createdAt: 2020-08-31T05:47:56.000Z,
    updatedAt: 2020-08-31T05:47:56.000Z,
    blogs: [ [Object], [Object] ] // 可以通过在console.log外面加上stringfy展开，这里就不了
  }
]
2
*/