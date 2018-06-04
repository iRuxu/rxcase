import arr from "array.js";
import bom from "bom.js";
import common from "common.js";

var __ = {};

//Common
__.typeOf = common.typeOf

//数组
__.sort = arr.sort;
__.reverse = arr.reverse;
__.append = arr.append;
__.prepend = arr.prepend;
__.insert = arr.insert;
__.removeLast = arr.removeLast;
__.removeFirst = arr.removeFirst;
__.remove = arr.remove;
__.fill = arr.fill;
__.replace = arr.replace;
__.slice = arr.slice;
__.clean = arr.clean;

//BOM
__.ua = bom.ua;
__.response = bom.response;
__.remResize = bom.remResize;
__.param = bom.param;