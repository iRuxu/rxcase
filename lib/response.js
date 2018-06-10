module.exports = function (config){
    /**
     * 设置一个响应样式规则
     * @name response
     * @param {Object} config
     * 例：{'screen-phone':[320,768]}
     * 当窗口尺寸在value对应值范围内时（包含第一个值，但不包含第二个值），将在html元素上添加key的class
     */
    //默认的响应临界值
    var default_config = {
        "screen-l": [1920, 2880], //1920*1080
        "screen-m": [1440, 1920], //1440*900
        "screen-s": [1280, 1440], //1280*800  笔记本
        "screen-padX": [1024, 1280], //1024*768  pad横屏
        "screen-padY": [768, 1024], //768*1024  pad竖屏
        "screen-phone": [320, 768] //320*568   phone
    };
    if (config == undefined) config = default_config;

    //创建映射数组
    var screen_cls = [];
    for (var key in config) {
        screen_cls.push(key);
    }

    //根据页面尺寸绑定对应class至html
    var resetLayout = function() {
        var width =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        var height =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight;

        Fn.win.width = width;
        Fn.win.height = height;

        var html = document.documentElement;
        var cls = html.className;
        var _cls = "";

        //清空现有值
        for (var i = 0; i < screen_cls.length; i++) {
            if (cls.indexOf(screen_cls[i]) > 0) {
                cls = cls.replace(screen_cls[i], "");
            }
        }

        //寻找所属区间
        for (var clazz in config) {
            var min = config[clazz][0];
            var max = config[clazz][1];
            if (width >= min && width < max) {
                _cls = clazz;
                break;
            }
        }

        //添加新的class
        var clsarr = cls.split(" ");
        clsarr.push(_cls);
        Fn.trim(clsarr);
        cls = clsarr.join(" ");
        document.documentElement.className = cls;
    };

    //第一次加载页面时执行
    resetLayout();

    //当变更窗口尺寸时重设
    window.onresize = function() {
        resetLayout();
    };
}