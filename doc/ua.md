#### fn.ua() 
返回一个记录ua信息的对象
*  isPC : (boolean) 是否是pc端
*  isMobile : (boolean) 是否是移动端
*  platform : (string) pc、ipad等各类移动端平台名称
*  browser : (string) chrome等浏览器的名称
*  version : (integer) 浏览器的版本  
*同时给html根元素添加以下class*
*  .ua-pc / ua-mobile
*  .ua-ipad / .ua-iphone / ... （主要用于ios下一些特殊需要）
*  .browser-firefox / .browser-safari / ... （主要用于firefox,safari一些特殊情况）
*  .ie-8 / ... （如果是IE浏览器，会额外有ie-版本号，用来特殊处理IE版本下的问题）
```javascript
var ua = fn.ua()
//打印ua可能的值：
{
    isPC:false,
    isMobile:true,
    platform:'iphone',
    browser:'wx',   //微信内部访问
    version:6
}
```