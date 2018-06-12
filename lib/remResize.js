export default function (designSize){
    /**
     * 重设页面REM基准值
     * @name remResize
     * @param {Number} designSize 设计稿尺寸宽（基准用）
     */
    var remResize = function() {
        designSize = !!designSize ? designSize : 750;
        var w =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        var size = (w / designSize) * 100;
        size = size < 100 ? size : 100;
        document.documentElement.style.fontSize = size + "px";
    };

    //第一次执行时
    remResize();

    //当变更窗口尺寸时重设
    window.onresize = function() {
        remResize();
    }
}