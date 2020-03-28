/**
 * userAgent检测
 * @name userAgent
 * @returns {Object} 返回一个记录ua信息的对象
 *
 */

function userAgent(ua = window.navigator.userAgent) {
    let _ = {};

    _.platform = platformCheck(ua);
    _.isMobile = !!_.platform;
    _.isPC = !_.isMobile;

    _.os = osCheck();

    let o = browserCheck(ua);
    _.browser = o.browser;
    _.version = o.version;

    _.lang = window.navigator.language;

    return _;
}

// 移动平台
function platformCheck(ua) {
    ua = ua.toLowerCase();

    const mobileAgents = {
        micromessenger: "wx",
        android: "android",
        iphone: "iphone",
        symbian: "symbian",
        "windows phone": "wp",
        ipad: "ipad",
        ipod: "ipod",
        silk: "kindle"
    };

    for (let key in mobileAgents) {
        if (ua.indexOf(key) > -1) {
            return mobileAgents[key];
        }
    }

    return "";
}

// 操作系统
function osCheck() {
    let os = window.navigator.platform.toLowerCase();
    const osArray = ["mac", "win", "linux"];
    for (let key of osArray) {
        if (os.indexOf(key) > -1) {
            return key;
        }
    }
    return "";
}

// 浏览器版本
function browserCheck(ua) {
    ua = ua.toLowerCase();

    let pcAgents =
        /(micromessenger|opr|edge|firefox|silk)[ \/]([\w.]+)/.exec(ua) || // Wechat & Oprea & Edge & firefox
        /(silk)[\/]([\w.]+)/.exec(ua) || //kindle
        /(chrome)[ \/]([\w.]+)/.exec(ua) || // Chrome
        /(safari)[ \/]([\w.]+)/.exec(ua) || // Safari
        /(msie) ([\w.]+)/.exec(ua) || //IE7-10
        /(trident).+rv:(\w.)+/.exec(ua) ||
        []; //IE 11
    const pcAgentsAlias = {
        micromessenger: "wx",
        opr: "oprea",
        edge: "edge",
        firefox: "firefox",
        silk:"silk",
        chrome: "chrome",
        safari: "safari",
        trident: "ie",
        msie: "ie"
    };
    let browser = pcAgentsAlias[pcAgents[1]];
    let version = parseInt(pcAgents[2]);
    return { browser, version };
}

export { userAgent, platformCheck, osCheck, browserCheck };
