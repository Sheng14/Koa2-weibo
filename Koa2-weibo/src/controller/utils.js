/**
 * @description 处理上传文件的删除和储存
 * @author Sheng14
 */

const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrnoInfo')
const path = require('path')
const fse = require('fs-extra')

// 文件可存储的最大体积 1M
const MIX_SIZE = 1024 * 1024 * 1024

// 定义储存的文件夹目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')

// 判断目录是否存在
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})

/**
 * 保存文件
 * @param {string} name 文件名 
 * @param {string} type 文件类型 
 * @param {number} size 文件体积大小 
 * @param {string} filePath 文件路径 
 */
async function saveFile ({ size, name, filePath, type }) {
    if (size > MIX_SIZE) { // 如果超过规定的最大体积就直接删除原本暂存的文件且返回错误信息，防止不合格的文件还堆积起来
        await fse.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }
    const fileName = Date.now + '.' + name // 重命名，防止重名
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName) // 文件的具体路径
    await fse.move(filePath, distFilePath) // 移动文件到上面的路径
    return new SuccessModel({
        url: '/' + fileName // 返回一个可以通过静态资源访问到的路径（前面的路径在app.js定义了，所以只需要加个文件名就行）
    })
}

module.exports = {
    saveFile
}