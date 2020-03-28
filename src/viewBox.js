function viewBox(){
    const viewBox = {}
    //色彩位数
    viewBox.color = screen.pixelDepth

    //设备像素比
    viewBox.dpr = window.devicePixelRatio

    //屏幕方向
    viewBox.orientation = ''
    switch(screen.orientation.type){
        case 'landscape-primary':
            viewBox.orientation = 'x'
            break;
        case 'landscape-secondary':
            viewBox.orientation = '-x'
            break;
        case 'portrait-primary':
            viewBox.orientation = 'y'
            break;
        case 'portrait-secondary':
            viewBox.orientation = '-y'
            break;
    }
    //旋转角度
    viewBox.angle = screen.orientation.angle

    //窗口位置
    viewBox.screen = {
        x : window.screenX,
        y : window.screenY
    }

    //窗口尺寸
    viewBox.inner = {
        width : window.innerWidth,
        height : window.innerHeight
    }
    viewBox.outer = {
        width : window.outerWidth,
        height : window.outerHeight
    }

    //滚屏位置
    viewBox.scroll = {
        x : window.scrollX,
        y : window.scrollY
    }

    return viewBox
}
export default viewBox