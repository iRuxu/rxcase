/**
 * 数据类型判断
 * 
 * @param {any} 需要判断的数据对象
 * @returns {String} 返回数据类型 string/array/object/number/undefined/null/boolean
 */
function typeOf (o) {
    var s = Object.prototype.toString.call(o)
    return s.match(/\[object (.*?)\]/)[1].toLowerCase()
};


export default {
    typeOf
}