import advreg from '../lib/pattern.js';

let test = '<a>okokok</a>'
let pattern = '\<.*?\>'
advreg(test,pattern,function (result,o){
    console.log(result,o)
})