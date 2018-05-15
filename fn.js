var Fn = {
    ua : {},
    win : {}
}

//Utility
//===================================================
/**
 * 数据类型判断
 * 
 * @param {any} 需要判断的数据对象
 * @returns {string} 返回数据类型 string/array/object/number/undefined/null/boolean
 */
Fn.typeOf = function (o) {
    var s = Object.prototype.toString.call(o)
    return s.match(/\[object (.*?)\]/)[1].toLowerCase()
};


/**
 * 判断是否为空
 * 
 * @param {any} o 对象、数组、函数参数、字符串
 * @returns {boolean}
 */
Fn.isEmpty = function (o) {
    //null
    if (o == null) return true
    //function arguments
    if (!!o.callee) return o.callee.length === 0
    //string array object
    return o.length === 0 || Object.keys(o).length === 0
};


/**
 * 判断是否为DOM元素
 * 
 * @param {any} o 要传入的对象
 * @returns {boolean}
 */
Fn.isElement = function (o) {
    return !!(o && o.nodeType === 1);
};


/**
 * 返回min~max的一个随机整数，包含min与max
 * 
 * @param {number} min 
 * @param {number} max 
 * @returns 
 */
Fn.random = function (min, max) {
    return min + Math.floor((max - min + 1) * Math.random())
}

/**
 * 返回当前的时间戳
 * 
 * @returns {number} 1526360255318
 */
Fn.now = function () {
    return new Date().getTime()
}

//混用
//===================================================
/**
 * 克隆一个对象（对象、数组、基本类型）
 * 
 * @param {any} o 需要被克隆的目标
 * @returns {any} 返回克隆生成的目标
 */
Fn.clone = function (o) {
    var objClone;
    if (o.constructor == Object) objClone = new o.constructor();
    else objClone = new o.constructor(o.valueOf());
    for (var key in o) {
        if (objClone[key] != o[key]) {
            if (typeof (o[key]) == 'object') {
                objClone[key] = Fn.clone(o[key]);
            }
            else {
                objClone[key] = o[key];
            }
        }
    }
    objClone.toString = o.toString;
    objClone.valueOf = o.valueOf;
    return objClone;
}

/**
 * 移除数组中的无效值或字符串两端中的空格
 * 
 * @param {array|string} o 需要被处理的对象
 * @returns {array|string} 返回除空后的对象
 */
Fn.trim = function (o) {
    //如果是字符串
    if (Object.prototype.toString.call(o) == '[object String]') {
        return o.replace(/(^\s*)|(\s*$)/g, "");
    }
    //如果是数组
    if (Object.prototype.toString.call(o) == '[object Array]') {
        for (var i = 0; i < o.length; i++) {
            if (!o[i]) {
                o.splice(i, 1)
                i--
            }
        }
        return o
    }
}

//数组
//===================================================
/**
 * 重新排序一个数组
 * 
 * @param {array} arr 要进行重新排序的数组
 * @param {boolean} order 默认升序排列，指定false为降序排列 
 * @returns {array} 返回重新排序后的新数组，不修改原数组
 */
Fn.sort = function (arr, order) {
    order == undefined ? order = true : order = !!order
    var _arr = arr.slice(0)
    _arr.sort(function (a, b) {
        if (!order) return b - a
        return a - b
    })
    return _arr
}


//DOM
//===================================================
/**
 * 返回一个16进制编码随机颜色
 * 
 * @returns {string} #FF3399
 */
Fn.randomColor = function () {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).toUpperCase()
}

/**
 * 图片预加载
 * 
 * @param {array} 图片路径字符串数组 [img1.png,img2.png]
 * @param {function} 图片加载完成后执行的回调函数，回调函数中的o指向图片对象
 * @returns {array} 返回图片对象数组
 */
Fn.preLoadImage = function (srcArr, callback) {

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



//BOM
//===================================================
/**
 * UserAgent检测
 * 
 * @returns {object} 返回一个记录ua信息的对象
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
Fn.ua = function () {

    var ua = window.navigator.userAgent.toLowerCase()
    var _ua = {
        isPC: true,
        isMobile: false,
        platform: 'pc'
    }
    var cls = document.documentElement.className

    //平台检测
    var mobileAgents = ['micromessenger', 'android', 'iphone', 'symbianOS', 'windows phone', 'ipad', 'ipod'];
    var mobileAngntsAlias = ['wx', 'android', 'iphone', 'symbian', 'wp', 'ipad', 'ipod'];
    var platformCheck = function () {
        for (var i = 0; i < mobileAgents.length; i++) {
            if (ua.indexOf(mobileAgents[i]) > 0) {
                _ua.isPC = false
                _ua.isMobile = true
                _ua.platform = mobileAngntsAlias[i]
                cls += ' ua-mobile ua-' + mobileAngntsAlias[i]
                document.documentElement.className = cls
                break
            }
        }
        if (_ua.isPC) {
            cls += ' ua-' + 'pc'
            document.documentElement.className = cls
        }
    }()

    //浏览器检测
    var pcAgents =
        /(micromessenger|opr|edge|firefox)[ \/]([\w.]+)/.exec(ua) || // Wechat & Oprea & Edge & firefox
        /(chrome)[ \/]([\w.]+)/.exec(ua) || // Chrome
        /(safari)[ \/]([\w.]+)/.exec(ua) || // Safari
        /(msie) ([\w.]+)/.exec(ua) ||   //IE7-10
        /(trident).+rv:(\w.)+/.exec(ua) || [];  //IE 11
    var pcAgentsAlias = {
        micromessenger: 'wx',
        opr: 'oprea',
        edge: 'edge',
        firefox: 'firefox',
        chrome: 'chrome',
        safari: 'safari',
        trident: 'ie',
        msie: 'ie'
    }
    var browserCheck = function () {
        var browser = pcAgents[1]
        _ua.browser = pcAgentsAlias[browser]

        var version = pcAgents[2]
        _ua.version = parseInt(version)

        cls += ' browser-' + _ua.browser
        if (_ua.browser == 'ie') cls += ' ie-' + _ua.version
        document.documentElement.className = cls
    }()

    Fn.ua = _ua
    return _ua
}

/**
 * 设置一个响应样式规则
 * 
 * @param {object} config 
 * 例：{'screen-phone':[320,768]}
 * 当窗口尺寸在value对应值范围内时（包含第一个值，但不包含第二个值），将在html元素上添加key的class
 */
Fn.response = function (config) {

    //默认的响应临界值
    var default_config = {
        'screen-l': [1920, 2880],   //1920*1080
        'screen-m': [1440, 1920],   //1440*900  
        'screen-s': [1280, 1440],   //1280*800  笔记本
        'screen-padX': [1024, 1280],   //1024*768  pad横屏
        'screen-padY': [768, 1024],    //768*1024  pad竖屏
        'screen-phone': [320, 768]     //320*568   phone
    }
    if (config == undefined) config = default_config

    //创建映射数组
    var screen_cls = []
    for (var key in config) {
        screen_cls.push(key)
    }

    //根据页面尺寸绑定对应class至html
    var resetLayout = function () {
        var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        Fn.win.width = width
        Fn.win.height = height

        var html = document.documentElement;
        var cls = html.className
        var _cls = ''

        //清空现有值
        for (var i = 0; i < screen_cls.length; i++) {
            if (cls.indexOf(screen_cls[i]) > 0) {
                cls = cls.replace(screen_cls[i], '')
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
        var clsarr = cls.split(' ')
        clsarr.push(_cls)
        Fn.trim(clsarr)
        cls = clsarr.join(' ')
        document.documentElement.className = cls

    };

    //第一次加载页面时执行
    resetLayout()

    //当变更窗口尺寸时重设
    window.onresize = function () {
        resetLayout()
    };
}

/**
 * 重设页面REM基准值
 * 
 */
Fn.remResize = function () {
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var size = (w / 750) * 100;
    document.documentElement.style.fontSize = (size < 100 ? size : 100) + 'px';
}

/**
 * 获取url请求的字符串
 * 
 * @param {string} key URI请求的key
 * @returns {string} URI请求的key的值
 */
Fn.param = function (key) {
    var map = {}
    var param = window.location.search.slice(1).split('&')
    for (var i = 0; i < param.length; i++) {
        param[i] = decodeURI(param[i]).split('=')
        map[param[i][0]] = param[i][1]
    }
    return map[key]
}