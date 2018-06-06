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