import { version } from '../package.json'

import bom from '../lib/bom.js';
import dom from '../lib/dom.js';
import common from '../lib/common.js';
import arr from '../lib/array.js';

var fn = {
    ver : version
}

fn.ua = bom.ua
fn.response = bom.response
fn.remResize = bom.remResize
fn.param = bom.param

fn.randomColor = dom.randomColor
fn.preLoadImage = dom.preLoadImage

fn.typeOf = common.typeOf
fn.random = common.random
fn.now = common.now

fn.sort = arr.sort
fn.reverse = arr.reverse
fn.append = arr.append
fn.prepend = arr.prepend
fn.insert = arr.insert
fn.removeLast = arr.removeLast
fn.removeFirst = arr.removeFirst
fn.remove = arr.remove
fn.fill = arr.fill
fn.replace = arr.replace
fn.slice = arr.slice
fn.clean = arr.clean

var root = typeof global !== 'undefined' ? global : window
var $fn = root.fn
fn.noConflict = function(){
    if(root.fn === fn){
        root.fn = $fn
    }
    return fn
}
root.fn = fn