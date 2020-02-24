/**
 * Json解析
 *
 * @param {*} json json字符串
 * @returns promise
 */
function jsonParse(json){
    return new Promise((resolve,reject)=>{
        try{
            let target = JSON.parse(json)
            resolve(target)
        }catch(e){
            reject(e)
        }
    })
}

export default jsonParse