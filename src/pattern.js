/**
 * 正则匹配回调处理
 *
 * @param {*} str 传入字符串
 * @param {*} reg 正则表达式
 * @param {*} callback 执行函数
 */
function pattern(str,reg,callback){

    const _reg = reg.global ? reg : new RegExp(reg,'g')

    var result;
    while(result = _reg.exec(str)){
        callback && callback(result)
    }
}

export default pattern

