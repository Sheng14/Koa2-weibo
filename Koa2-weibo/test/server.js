/**
 * @description jest server
 * @author Sheng14
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)