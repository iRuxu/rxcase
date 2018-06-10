import json from "rollup-plugin-json";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
    input: "src/fn.js",
    output: {
        name: "fn",
        file: "fn.js",
        format: "iife"
    },
    plugins: [json(), resolve(), commonjs()]
};
