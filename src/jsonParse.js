/**
 * Json解析
 *
 * @param {*} json json字符串
 * @returns promise
 */
function jsonParse(json){
    return new Promise((resolve,reject)=>{
        try{
            //对空字符串做特殊处理
            if(json.trim() == ''){
                resolve('')
            }else{
                resolve(JSON.parse(json))
            }
        }catch(e){
            reject(new Error(`[JSON.parse Error] Origin Data => ${json}`))
        }
    })
}

export default jsonParse