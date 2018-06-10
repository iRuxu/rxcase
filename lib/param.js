module.exports = function (key){
    /**
     * 获取url请求的字符串
     * @name param
     * @param {String} key URI请求的key
     * @returns {String} URI请求的key的值
     */
    var map = {};
    var param = window.location.search.slice(1).split("&");
    for (var i = 0; i < param.length; i++) {
        param[i] = decodeURI(param[i]).split("=");
        map[param[i][0]] = param[i][1];
    }
    return map[key];
}