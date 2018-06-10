import json from "rollup-plugin-json";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
    input: "src/fn.js",
    output: {
        file: "fn.cjs.js",
        format: "cjs"
    },
    plugins: [json(), resolve(), commonjs()]
};
