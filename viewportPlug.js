export default function (plugSize=768){
    /**
     * UserAgent检测
     * @name viewportPlug
     * @param {Number} plugSize 插拔阈值
     * @desc 依赖jquery,lodash,ua
     */
    let viewportPlug = function(){
        let w = window.outerWidth
        const meta = `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">`
        if(_ua.isMobile && w<= plugSize){
            $('head').append(meta)
        }else{
            $('head').find('meta[name=viewport]').remove()
            if($('body').width()<1024){
                console.warn('body尺寸小于平板横屏的宽度，等比缩放可能无法完全正常工作')
            }
        }
    }

    //第一次执行时
    viewportPlug()

    //当变更窗口尺寸时重设
    if(_ua.isMobile){
        $(window).on('orientationchange',_.debounce(viewportPlug,200))
    }else{
        $(window).on('resize',_.debounce(viewportPlug,200))
    }
}