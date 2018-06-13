import { version } from "../package.json";
import param from "../lib/param.js";
import preLoadImage from "../lib/preLoadImage.js";
import randomColor from "../lib/randomColor.js";
import remResize from "../lib/remResize.js";
import response from "../lib/response.js";
import typeOf from "../lib/typeOf.js";
import ua from "../lib/ua.js";

var fn = {
    ver: version,
    param: param,
    preLoadImage: preLoadImage,
    randomColor: randomColor,
    remResize: remResize,
    response: response,
    typeOf: typeOf,
    ua: ua
};
var root = typeof global !== "undefined" ? global : window;
var $fn = root.fn;
fn.noConflict = function() {
    if (root.fn === fn) {
        root.fn = $fn;
    }
    return fn;
};
root.fn = fn;