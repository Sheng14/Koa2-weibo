/**
 * @description 返回数据格式化模型
 * @author Sheng14
 */


/**
 * 基础模型
 */
class BaseModel {
    constructor({errno, data, message}) { // 接收三个参数，但是根据错误码接收data/message，也就是说实际上只有两个参数
        this.errno = errno
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

/**
 * 成功模型
 */
class SuccessModel extends BaseModel{
    constructor(data = {}) { // 成功的话一般只需要接收一个data,errno我们默认给0就可以了
        super({
            errno: 0,
            data
        })
    }
}

/**
 * 失败模型
 */
class ErrnoModel extends BaseModel {
    constructor({errno, message}) { // 失败的话需要错误码和错误信息
        super({
            errno,
            message
        })
    }
}

module.exports = {
    SuccessModel,
    ErrnoModel
}