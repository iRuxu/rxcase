/**
 * 返回一个16进制编码随机颜色
 *
 * @returns {String} #FF3399
 */
function randomColor(){
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase()
}

export default randomColor