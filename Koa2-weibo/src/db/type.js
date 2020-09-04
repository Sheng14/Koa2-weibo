/**
 * @description 数据模型简化封装
 * @author Sheng14
 */

const Sequelize = require('sequelize')

module.exports = {
    STRING:　Sequelize.STRING,
    DECIMAL: Sequelize.DECIMAL,
    TEXT: Sequelize.TEXT,
    BOOLEAN: Sequelize.BOOLEAN,
    INTEGER: Sequelize.INTEGER
}