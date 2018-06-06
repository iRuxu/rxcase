# Usage
## Install 
### *Browser* 
在浏览器中使用  
use it in the browser,just create a script tag and insert it.
```html
<script src="fn.js">
```

### *NPM*
在NPM中安装时，建议直接单独引用lib目录下对应模块，而不是整个项目，因为部分函数仅在浏览器中有效  
when you use it in npm,please require the modules from lib folder,not all,because some of the functions only work in browsers.
```shell
npm install webfn
```

## Sample
默认使用fn作为命名空间  
The default namespace is "fn",you can use the function as this example
```javascript
fn.random(1,10)
//1 | 2 | ... 10 
//生成1-10（包括1与10）之间的随机整数
//return an random integer number in [1~10]
```
如果fn与当前环境下其他命名冲突，或者你想换个名字，你可以使用下面的方法  
if the "fn" is existed,or you just wanna change another name
```javascript
var ___ = fn.conflict()
//now you can use "__" instead of "fn",just like:
__.random(1,10)
```

## Reference

### BOM 
| function | return | description | mark |
|----------| -------| ------------| ---- |
| fn.ua()  | object | 返回一个记录ua信息的对象| 同时为html根元素添加一些样式 |
| fn.response([opts])  | - | 指定一个样式响应规则 | 同时为html根元素添加一些样式 |
|fn.resetREM([designSize])| - | 根据设计稿尺寸重设REM基准值 | 默认值750 |
|fn.param(key)|-|获取当前url请求字符串中指定key的值|-|

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
#### fn.response([opts]) 
设置一个响应样式规则
* 传入一个可选对象以设置窗口尺寸变化时，修改html上的样式名称
* 当窗口尺寸在value对应值范围内时（包含第一个值，但不包含第二个值），将在html元素上添加key的class
```javascript
fn.response({
    "screen-l": [1920, 2880], //1920*1080
    "screen-m": [1440, 1920], //1440*900
    "screen-s": [1280, 1440], //1280*800  笔记本
    "screen-padX": [1024, 1280], //1024*768  pad横屏
    "screen-padY": [768, 1024], //768*1024  pad竖屏
    "screen-phone": [320, 768] //320*568   phone
})
```
#### fn.resetREM([designSize]) 
重设页面REM基准值
* 根据设计稿尺寸重新定义页面的REM基准值 for mobile
* 默认值为750
```javascript
fn.resetREM(640)
```

### DOM
| function | return | description | mark |
|----------| -------| ------------| ---- |
|randomColor()|"#00CCFF"|返回一个随机颜色|-|
|preLoadImage(srcArr,[cb])|-|预加载一组图片，全部加载完成后执行回调函数|-|

### Common
| function | return | description | mark |
|----------| -------| ------------| ---- |
| typeOf(o)| (string)|判断目标类型|-|
|random(min,max)|integer|返回两个数之间的随机整数|包含min,max的向下取整数|
| now()|integer|返回当前时间戳|-|

### Array 
**所有数组方法均不会改变原数组，范围取值时均包括起始与结尾位置的值**  
| function | return | description | mark |
|----------| -------| ------------| ---- |
|sort(arr,method)|array|对数组进行排序，并返回新的数组|method可传入true(默认)正序,false(倒序),fn(指定函数)|
|reverse(arr)|array|对数组进行反转|-|
|append(arr,...arg)|array|在数组末尾添加值|类似push|
|prepend(arr,...arg)|array|在数组起始添加值|类似unshift|
|insert(arr,start,...arg)|array|在数组指定索引位置添加值|-|
|removeLast(arr)|array|删除数组最后一个元素|类似pop|
|removeFirst(arr)|array|删除数组第一个元素|类似shift|
|remove(arr,start,end)|array|删除指定[start~end]区间的值|-|
|fill(arr,val,start,end)|array|使用指定值填充数组|类似fill|
|replace(arr,val,start,end,ispreat)|array|使用外部数组替换目标数组的部分值|isrepeat指定当外部数组长度不够需要替换的区间时是否重复，默认false|
|slice(arr,start,end)|array|截取数组范围值|类似slice|
|clean(arr)|array|移除数组中的假值、空值、无效值|-|





