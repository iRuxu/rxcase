//正则匹配捕获组处理
export default function (str,pattern,callback){
    //creat regexp
    const o = {
        regs : new RegExp(pattern,'g'),
        reg : new RegExp(pattern)
    }
    //if matched
    if(o.regs.test(str)){

        //match by regs and return an array
        let list = str.match(o.regs)
        o.list = list

        //mapping the multiple matches
        for(let i=0;i<list.length;i++){

            //exec single match
            let result = o.reg.exec(list[i])

            //do something with this result,get capture or index ,etc
            callback && callback(result,o)
        }
    }
}


