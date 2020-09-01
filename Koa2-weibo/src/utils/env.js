/**
 * @description 环境变量配置
 * @author Sheng14
 */

 const env = process.env.NODE_ENV

 module.exports = {
    isDev: env === 'dev',
    notDev: env !== 'dev',
    isPrd: env === 'production',
    notPrd: env !== 'production'
 }