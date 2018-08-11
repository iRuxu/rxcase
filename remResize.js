export default function (designSize=750,times=100){
    /**
     * 重设页面REM基准值
     * @name remResize
     * @param {Number} designSize 设计稿尺寸宽（基准用）
     * @param {Number} times 倍数
     * @desc 依赖jquery,lodash
     */
    let remResize = function() {
        let w =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        let size = (w / designSize) * times;
        size = size < times ? size : times;
        document.documentElement.style.fontSize = size + "px";
    };

    //第一次执行时
    remResize();

    //当变更窗口尺寸时重设
    $(window).on('resize',_.debounce(remResize,200))
}