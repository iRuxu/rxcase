(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

    var version = "0.0.2";

    var bom = {
        /**
         * UserAgent检测
         *
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
        ua: function() {
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
        },

        /**
         * 设置一个响应样式规则
         *
         * @param {Object} config
         * 例：{'screen-phone':[320,768]}
         * 当窗口尺寸在value对应值范围内时（包含第一个值，但不包含第二个值），将在html元素上添加key的class
         */
        response: function(config) {
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
        },

        /**
         * 重设页面REM基准值
         *
         * @param {Number} designSize 设计稿尺寸宽（基准用）
         */
        remResize: function(designSize) {
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
        },

        /**
         * 获取url请求的字符串
         *
         * @param {String} key URI请求的key
         * @returns {String} URI请求的key的值
         */
        param: function(key) {
            var map = {};
            var param = window.location.search.slice(1).split("&");
            for (var i = 0; i < param.length; i++) {
                param[i] = decodeURI(param[i]).split("=");
                map[param[i][0]] = param[i][1];
            }
            return map[key];
        }
    };

    var dom = {
        /**
         * 返回一个16进制编码随机颜色
         * 
         * @returns {String} #FF3399
         */
        randomColor : function () {
            return '#' + Math.floor(Math.random() * 16777215).toString(16).toUpperCase()
        },

        /**
         * 图片预加载
         * 
         * @param {Array} 图片路径字符串数组 [img1.png,img2.png]
         * @param {function} 图片加载完成后执行的回调函数，回调函数中的o指向图片对象
         * @returns {Array} 返回图片对象数组
         */
        preLoadImage : function (srcArr, callback) {

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
        }
    };

    var common = {
        /**
         * 数据类型判断
         * 
         * @param {any} 需要判断的数据对象
         * @returns {String} 返回数据类型 string/array/object/number/undefined/null/boolean
         */
        typeOf : function(o) {
            var s = Object.prototype.toString.call(o);
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
    };

    var array = {
        //数组排序(true正序，false倒序，function指定方法)
        sort: function(arr, method) {
            var _arr = arr.slice(0);
            if (Object.prototype.toString.call(method) != "[Object function]") {
                var order = method == undefined ? true : ~~method;
                _arr.sort(function(a, b) {
                    if (!order) return b - a;
                    return a - b;
                });
                return _arr;
            }
            return _arr.sort(method);
        },

        //数组反转
        reverse: function(arr) {
            var _arr = arr.slice(0);
            return _arr.reverse();
        },

        //数组末尾添加
        append: function(arr, ...arg) {
            var _arr = arr.slice(0);
            if (arg != undefined) _arr.push(...arg);
            return _arr;
        },

        //数组起始添加
        prepend: function(arr, ...arg) {
            var _arr = arr.slice(0);
            if (arg != undefined) _arr.unshift(...arg);
            return _arr;
        },

        //数组添加
        insert: function(arr, start, ...arg) {
            var _arr = arr.slice(0);
            if (arg != undefined) {
                //为负数索引时，添加在元素后方，保证语义倒数的位置；为正数索引时，添加在元素前方
                start < 0
                    ? _arr.splice(arr.length + start + 1, 0, ...arg)
                    : _arr.splice(start, 0, ...arg);
            }
            return _arr;
        },

        //数组删除最后一个元素
        removeLast: function(arr) {
            var _arr = arr.slice(0);
            _arr.pop();
            return _arr;
        },

        //数组删除最前一个元素
        removeFirst: function(arr) {
            var _arr = arr.slice(0);
            _arr.shift();
            return _arr;
        },

        //数组删除指定索引区域的元素 (start与end均包括)
        remove: function(arr, start, end) {
            var _arr = arr.slice(0);
            start = start == undefined ? 0 : start < 0 ? arr.length + start : start;
            end = end == undefined ? arr.length : end < 0 ? arr.length + end : end;
            var _start = Math.min(start, end);
            var delnum = Math.abs(end - start) + 1; //包含末边界
            _arr.splice(_start, delnum);
            return _arr;
        },

        //数组填充替换 (start与end均包括)
        fill: function(arr, val, start, end) {
            var _arr = arr.slice(0);
            if (!!end && end > 0) end = end + 1;
            _arr.fill(val, start, end);
            return _arr;
        },

        //数组外部替换 (start与end均包括)
        replace: function(arr, val, start, end, isrepeat) {
            //如果替换目标为空不执行任何操作
            if (val == undefined || !val.length) return;

            //定义位置
            start = start == undefined ? 0 : start < 0 ? arr.length + start : start;
            end = end == undefined ? arr.length : end < 0 ? arr.length + end : end;
            isrepeat = !!isrepeat;

            var need_len = Math.abs(end - start) + 1; //包含末边界
            var cur_len = val.length;
            var _arr = arr.slice(0);
            var _start = Math.min(start, end);

            //如果用于替换的长度大于或等于需要的长度，取需要的长度
            if (cur_len >= need_len) {
                _arr.splice(_start, need_len, ...val.slice(0, need_len));
                //如果用于替换的长度小于需要的长度
            } else {
                //不重复，取目标长度
                if (!isrepeat) {
                    _arr.splice(_start, cur_len, ...val);
                    //重复，取需要的长度
                } else {
                    var repeat = [];
                    //重复倍数部分
                    for (var i = 1; i <= need_len / cur_len; i++) {
                        repeat.push(...val);
                    }
                    //追加余数部分
                    repeat.push(...val.slice(0, need_len % cur_len));

                    _arr.splice(_start, need_len, ...repeat);
                }
            }
            return _arr;
        },

        //数组截取 (start与end均包括)
        slice: function(arr, start, end) {
            start = start == undefined ? 0 : start < 0 ? arr.length + start : start;
            end = end == undefined ? arr.length : end < 0 ? arr.length + end : end;
            //不严格要求起始顺序，方便倒数语义取值
            _start = Math.min(start, end);
            _end = Math.max(start, end) + 1;
            return arr.slice(_start, _end);
        },

        //移除数组中假值、空值
        clean: function(arr) {
            var _arr = [];
            for (var i = 0, len = arr.length; i < len; i++) {
                if (!!arr[i]) _arr.push(arr[i]);
            }
            return _arr;
        }
    };

    var fn = {
        ver : version
    };

    fn.ua = bom.ua;
    fn.response = bom.response;
    fn.remResize = bom.remResize;
    fn.param = bom.param;

    fn.randomColor = dom.randomColor;
    fn.preLoadImage = dom.preLoadImage;

    fn.typeOf = common.typeOf;
    fn.random = common.random;
    fn.now = common.now;

    fn.sort = array.sort;
    fn.reverse = array.reverse;
    fn.append = array.append;
    fn.prepend = array.prepend;
    fn.insert = array.insert;
    fn.removeLast = array.removeLast;
    fn.removeFirst = array.removeFirst;
    fn.remove = array.remove;
    fn.fill = array.fill;
    fn.replace = array.replace;
    fn.slice = array.slice;
    fn.clean = array.clean;

    var root = typeof global !== 'undefined' ? global : window;
    var $fn = root.fn;
    fn.noConflict = function(){
        if(root.fn === fn){
            root.fn = $fn;
        }
        return fn
    };
    root.fn = fn;

})));
