export default function(o) {
    /**
    * 数据类型判断
    * @name typeOf
    * @param {any} 需要判断的数据对象
    * @returns {String} 返回数据类型 string/array/object/number/undefined/null/boolean
    */
   var s = Object.prototype.toString.call(o)
   return s.match(/\[object (.*?)\]/)[1].toLowerCase()
}