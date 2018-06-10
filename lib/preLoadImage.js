module.exports = function (srcArr, callback){
    /**
     * 图片预加载
     * @name preLoadImage
     * @param {Array} 图片路径字符串数组 [img1.png,img2.png]
     * @param {function} 图片加载完成后执行的回调函数，回调函数中的o指向图片对象
     * @returns {Array} 返回图片对象数组
     */

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
}