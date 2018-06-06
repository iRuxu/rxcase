# Usage
## Install 
use it in the browser,just create a script tag and insert it.
```html
<script src="fn.js">
```

when you use it in npm,please require the modules from lib folder,not all,because some of the functions only work in browsers.
```shell
npm install webfn
```

## Sample
The default namespace is "fn",you can use the function as this example
```javascript
fn.random(1,10)
//1 | 2 | ... 10  return an random integer number in [1~10]
```
if the "fn" is existed,or you just wanna change another name
```javascript
var ___ = fn.conflict()
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
( **所有数组方法均不会改变原数组，范围取值时均包括起始与结尾位置的值** )

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

 





