# Fn.js

## Usage
```javascript
import ua from 'ua.js'
let _ua = ua()
//return an object which contains some user agent info
{
    isPC:false,         
    isMobile:true,      
    platform:'iphone',  //pc | iphone | ipad ..
    browser:'wx',       //browser name
    version:6           //browser version
}
```

## Reference

+ **[ua()](https://github.com/iRuxu/fn.js/blob/master/lib/ua.js])**   
    return a ojbect which contains the user agent info,and add some classes to html element  

+ **[response([opts])](https://github.com/iRuxu/fn.js/blob/master/lib/response.js)**  
    define the response rules for window size,add some classes to the html element by the custom option

+ **[resetREM([designSize])](https://github.com/iRuxu/fn.js/blob/master/lib/remResize.js)**   
    rewrite the REM base size(modify the html font-size) refer to the design size

+ **[viewportPlug([plugSize])](https://github.com/iRuxu/fn.js/blob/master/lib/viewportPlug.js)**   
    define when the plug the viewport control meta,for example when you wanna show the pc model for ipad landscape state but the mobile model for ipad portrait state

+ **[param(key)](https://github.com/iRuxu/fn.js/blob/master/lib/param.js)**   
    get the value of the specified key in the url

+ **[randomColor()](https://github.com/iRuxu/fn.js/blob/master/lib/randomColor.js)**   
    return a random color string by hexadecimal code,just like"#00CCFF"

+ **[preLoadImage(srcArr,[cb])](https://github.com/iRuxu/fn.js/blob/master/lib/preLoadImage.js)**   
    load some images and exec a callback function

+ **[typeOf(o)](https://github.com/iRuxu/fn.js/blob/master/lib/typeOf.js)**   
    judge the type of the target,return a string,just like "string"
