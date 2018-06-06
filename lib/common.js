module.exports = {
    /**
     * 数据类型判断
     * 
     * @param {any} 需要判断的数据对象
     * @returns {String} 返回数据类型 string/array/object/number/undefined/null/boolean
     */
    typeOf : function(o) {
        var s = Object.prototype.toString.call(o)
        return s.match(/\[object (.*?)\]/)[1].toLowerCase()
    },

    /**
     * 返回min~max的一个随机整数，包含min与max
     * 
     * @param {Number} min 
     * @param {Number} max 
     * @returns 
     */
    random : function (min, max) {
        return min + Math.floor((max - min + 1) * Math.random())
    },

    /**
     * 返回当前的时间戳
     * 
     * @returns {Number} 1526360255318
     */
    now : function () {
        return new Date().getTime()
    }
}