var __ = {}

//是否为空数组
__.isEmptyArr = function (arr) {
    //如果仅有length但每个索引下标值都是undefined也作为空数组
    var len = arr.length
    if (len === 0) return true
    for (var i = 0; i < len; i++) {
        if (arr[i] != undefined) return false
    }
    return true
}

//数组第一个
__.first = function (arr) {
    return arr[0]
}

//数组最后一个
__.last = function (arr) {
    return arr[arr.length - 1]
}

//数组第N个（支持负数）
__.nth = function (arr, index) {
    index = !index ? 0 : (index < 0 ? arr.length + index : index)
    return arr[index]
}

//数组排序(true正序，false倒序，function指定方法)
__.sort = function (arr, method) {
    var _arr = arr.slice(0)
    if (Object.prototype.toString.call(method) != '[Object Function]') {
        var order = (method == undefined) ? true : ~~method
        _arr.sort(function (a, b) {
            if (!order) return b - a
            return a - b
        })
        return _arr
    }
    return _arr.sort(method)
}

//数组反转
__.reverse = function (arr) {
    var _arr = arr.slice(0)
    return _arr.reverse()
}

//数组末尾添加
__.append = function (arr, ...arg) {
    var _arr = arr.slice(0)
    if (arg != undefined) _arr.push(...arg)
    return _arr
}

//数组起始添加
__.prepend = function (arr, ...arg) {
    var _arr = arr.slice(0)
    if (arg != undefined) _arr.unshift(...arg)
    return _arr
}

//数组指定索引添加
__.insert = function (arr, start, ...arg) {
    var _arr = arr.slice(0)
    if (arg != undefined) {
        //为负数索引时，添加在元素后方，保证语义倒数的位置；为正数索引时，添加在元素前方
        start < 0 ? _arr.splice(arr.length + start + 1, 0, ...arg) : _arr.splice(start, 0, ...arg)
    }
    return _arr
}

//数组删除最后一个元素
__.removeLast = function (arr) {
    var _arr = arr.slice(0)
    _arr.pop()
    return _arr
}

//数组删除最前一个元素
__.removeFirst = function (arr) {
    var _arr = arr.slice(0)
    _arr.shift()
    return _arr
}

//数组删除指定索引区域的元素 (start与end均包括)
__.remove = function (arr, start, end) {
    var _arr = arr.slice(0)
    start = start == undefined ? 0 : (start < 0 ? arr.length + start : start)
    end = end == undefined ? arr.length : (end < 0 ? arr.length + end : end)
    var _start = Math.min(start, end)
    var delnum = Math.abs(end - start) + 1    //包含末边界
    _arr.splice(_start, delnum)
    return _arr
}

//数组清空 (会修改原数组)
__.empty = function (arr) {
    arr.length = 0
    return arr
}

//数组填充替换 (start与end均包括)
__.fill = function (arr, val, start, end) {
    var _arr = arr.slice(0)
    if (!!end && end > 0) end = end + 1
    _arr.fill(val, start, end)
    return _arr
}

//数组外部替换 (start与end均包括)
__.replace = function (arr, val, start, end, isrepeat) {
    //如果替换目标为空不执行任何操作
    if (val == undefined || !val.length) return

    //定义位置
    start = start == undefined ? 0 : (start < 0 ? arr.length + start : start)
    end = end == undefined ? arr.length : (end < 0 ? arr.length + end : end)
    isrepeat = ~~isrepeat

    var need_len = Math.abs(end - start) + 1    //包含末边界
    var cur_len = val.length
    var _arr = arr.slice(0)
    var _start = Math.min(start, end)

    //如果用于替换的长度大于或等于需要的长度，取需要的长度
    if (cur_len >= need_len) {
        _arr.splice(_start, need_len, ...val.slice(0, need_len))
        //如果用于替换的长度小于需要的长度
    } else {
        //不重复，取目标长度
        if (!isrepeat) {
            _arr.splice(_start, cur_len, ...val)
            //重复，取需要的长度
        } else {
            var repeat = []
            //重复倍数部分
            for (var i = 1; i <= need_len / cur_len; i++) {
                repeat.push(...val)
            }
            //追加余数部分
            repeat.push(...val.slice(0, need_len % cur_len))

            _arr.splice(_start, need_len, ...repeat)
        }
    }
    return _arr
}

//数组截取 (start与end均包括)
__.slice = function (arr, start, end) {
    start = start == undefined ? 0 : (start < 0 ? arr.length + start : start)
    end = end == undefined ? arr.length : (end < 0 ? arr.length + end : end)
    //不严格要求起始顺序，方便倒数语义取值
    _start = Math.min(start, end)
    _end = Math.max(start, end) + 1
    return arr.slice(_start, _end)
}

//返回第一个数组与第2个数组不同的部分（只取第一个数组中的值）
__.diff = function (originArr, compareArr, method) {
    var _arr = []
    if (method) {
        originArr.forEach(function (val, i) {
            originArr[i] = method(originArr[i])
        })
        compareArr.forEach(function (val, i) {
            compareArr[i] = method(compareArr[i])
        })
    }
    for (var i = 0, len = originArr.length; i < len; i++) {
        if (compareArr.indexOf(originArr[i]) >= 0) continue;
        _arr.push(originArr[i])
    }
    return _arr
}

//返回第一个数组与第2个数组相同同的部分（只取第一个数组中的值）
__.same = function (originArr, compareArr, method) {
    var _arr = []
    if (method) {
        originArr.forEach(function (val, i) {
            originArr[i] = method(originArr[i])
        })
        compareArr.forEach(function (val, i) {
            compareArr[i] = method(compareArr[i])
        })
    }
    for (var i = 0, len = originArr.length; i < len; i++) {
        if (compareArr.indexOf(originArr[i]) <= 0) continue
        _arr.push(originArr[i])
    }
    return _arr
}

//移除数组中假值
__.compact = function (arr) {
    var _arr = []
    for (var i = 0, len = arr.length; i < len; i++) {
        if (!!arr[i]) _arr.push(arr[i])
    }
    return _arr
}

//移除数组中重复的值
__.uniq = function (arr) {
    var _arr = [], hash = {}
    for (var i = 0, len = arr.length; i < len; i++) {
        var key = arr[i]
        if (!hash[key]) {
            _arr.push(key)
            hash[key] = true
        }
    }
    return _arr
}
