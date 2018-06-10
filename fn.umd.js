(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.fn = factory());
}(this, (function () { 'use strict';

    var version = "0.0.4";

    var param = function (key){
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
    };

    var preLoadImage = function (srcArr, callback){
        /**
         * 图片预加载
         * @name preLoadImage
         * @param {Array} 图片路径字符串数组 [img1.png,img2.png]
         * @param {function} 图片加载完成后执行的回调函数，回调函数中的o指向图片对象
         * @returns {Array} 返回图片对象数组
         */

        var imgArr = [];
        var loaded = 0;
        var toload = 0;

        for (var i = 0; i < srcArr.length; i++) {
            toload++;

            imgArr[i] = new Image();
            imgArr[i].src = srcArr[i];

            imgArr[i].onload = load;
            imgArr[i].onerror = load;
            imgArr[i].onabort = load;
        }
        function load() {
            if (++loaded == toload) {
                !!callback && callback(imgArr);
            }
        }
    };

    var randomColor = function (){
        /**
         * 返回一个16进制编码随机颜色
         * @name randomColor
         * @returns {String} #FF3399
         */
        return '#' + Math.floor(Math.random() * 16777215).toString(16).toUpperCase()
    };

    var remResize = function (designSize){
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
        };
    };

    var response = function (config){
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
    };

    var typeOf = function(o) {
        /**
        * 数据类型判断
        * @name typeOf
        * @param {any} 需要判断的数据对象
        * @returns {String} 返回数据类型 string/array/object/number/undefined/null/boolean
        */
       var s = Object.prototype.toString.call(o);
       return s.match(/\[object (.*?)\]/)[1].toLowerCase()
    };

    var ua = function (){
        /**
         * UserAgent检测
         * @name ua
         * @returns {Object} 返回一个记录ua信息的对象
         *  isPC : boolean
         *  isMobile : boolean
         *  platform : 'pc' pc、ipad等各类移动端平台名称
         *  browser : 'chrome' 浏览器的名称
         *  version : 28 浏览器的版本
         *
         *  同时给html根元素添加
         *  .ua-pc / ua-mobile
         *  .ua-ipad / .ua-iphone / ... （主要用于ios下一些特殊需要）
         *  .browser-firefox / .browser-safari / ... （主要用于firefox,safari一些特殊情况）
         *  .ie-8 / ... （如果是IE浏览器，会额外有ie-版本号，用来特殊处理IE版本下的问题）
         *
         */
        var ua = window.navigator.userAgent.toLowerCase();
        var _ua = {
            isPC: true,
            isMobile: false,
            platform: "pc"
        };
        var cls = document.documentElement.className;

        //平台检测
        var mobileAgents = [
            "micromessenger",
            "android",
            "iphone",
            "symbianOS",
            "windows phone",
            "ipad",
            "ipod"
        ];
        var mobileAngntsAlias = [
            "wx",
            "android",
            "iphone",
            "symbian",
            "wp",
            "ipad",
            "ipod"
        ];
        var platformCheck = (function() {
            for (var i = 0; i < mobileAgents.length; i++) {
                if (ua.indexOf(mobileAgents[i]) > 0) {
                    _ua.isPC = false;
                    _ua.isMobile = true;
                    _ua.platform = mobileAngntsAlias[i];
                    cls += " ua-mobile ua-" + mobileAngntsAlias[i];
                    document.documentElement.className = cls;
                    break;
                }
            }
            if (_ua.isPC) {
                cls += " ua-" + "pc";
                document.documentElement.className = cls;
            }
        })();

        //浏览器检测
        var pcAgents =
            /(micromessenger|opr|edge|firefox)[ \/]([\w.]+)/.exec(ua) || // Wechat & Oprea & Edge & firefox
            /(chrome)[ \/]([\w.]+)/.exec(ua) || // Chrome
            /(safari)[ \/]([\w.]+)/.exec(ua) || // Safari
            /(msie) ([\w.]+)/.exec(ua) || //IE7-10
            /(trident).+rv:(\w.)+/.exec(ua) ||
            []; //IE 11
        var pcAgentsAlias = {
            micromessenger: "wx",
            opr: "oprea",
            edge: "edge",
            firefox: "firefox",
            chrome: "chrome",
            safari: "safari",
            trident: "ie",
            msie: "ie"
        };
        var browserCheck = (function() {
            var browser = pcAgents[1];
            _ua.browser = pcAgentsAlias[browser];

            var version = pcAgents[2];
            _ua.version = parseInt(version);

            cls += " browser-" + _ua.browser;
            if (_ua.browser == "ie") cls += " ie-" + _ua.version;
            document.documentElement.className = cls;
        })();

        Fn.ua = _ua;
        return _ua;
    };

    var fn = {
        ver: version,
        param: param,
        preLoadImage: preLoadImage,
        randomColor: randomColor,
        remResize: remResize,
        response: response,
        typeOf: typeOf,
        ua: ua
    };
    var root = typeof global !== "undefined" ? global : window;
    var $fn = root.fn;
    fn.noConflict = function() {
        if (root.fn === fn) {
            root.fn = $fn;
        }
        return fn;
    };
    root.fn = fn;

    return fn;

})));
