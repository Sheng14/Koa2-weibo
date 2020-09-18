/**
 * @description 设置微博数据的缓存
 * @author Sheng14
 */

const { get, set } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

// 定义一个广场缓存前缀方便与其它的区分
const KEY_PREFIX = 'weibo: square'

/**
 * 获取广场列表的缓存
 * @param {Number} pageIndex 当前页
 * @param {Number} pageSize 每页数量
 */
async function getSquareCacheList (pageIndex, pageSize) {
    const key = `${KEY_PREFIX}${pageIndex}_${pageSize}` // 定义缓存的key
    // 尝试从缓存中获取key对应的值
    const cacheResult = await get(key)
    // 如果拿到了就直接返回不用去调用数据库
    if (cacheResult != null) {
        return cacheResult
    }
    // 如果缓存中没有就去调用数据库
    const result = await getBlogListByUser({ pageIndex, pageSize })
    console.log('result' + result)
    // 调用数据库拿到后记得先丢入缓存（时间单位是秒）
    set(key, result, 60)
    return result
}

module.exports = {
    getSquareCacheList
}