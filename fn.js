var Fn = {}

/**
 * 数据类型判断
 * @param {any} 需要判断的数据对象
 * @returns {string} 返回数据类型 string/array/object/number/undefined/null/boolean
 */
Fn.typeof = function (o) {
    var s = Object.prototype.toString.call(o)
    return s.match(/\[object (.*?)\]/)[1].toLowerCase()
};

/**
 * 图片预加载
 * @param {array} 图片路径字符串数组 [img1.png,img2.png]
 * @param {function} 图片加载完成后执行的回调函数，回调函数中的this指向图片对象
 * @returns {array} 返回图片对象数组
 */
Fn.preLoadImage = function (srcArr, callback) {
    if (Fn.typeof(srcArr) !== 'array') {
        console.error('[Fn.js] (preLoadImage) 图片预加载传入的参数不是一个数组')
        return
    }

    var imgArr = []
    var loaded = 0
    var toload = 0

    for (var i = 0; i < srcArr.length; i++) {
        toload++

        imgArr[i] = new Image()
        imgArr[i].src = srcArr[i]

        imgArr[i].onload = load
        imgArr[i].onerror = load
        imgArr[i].onabort = load
    }
    function load() {
        if (++loaded == toload) {
            !!callback && callback(imgArr)
        }
    }
    return imgArr
};