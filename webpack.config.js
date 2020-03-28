module.exports = {
    mode:'production',
    entry: {
        test : "./test/index.js",
        env : "./test/env.js"
    },
    output: {
        path: __dirname + '/temp',
        filename: '[name].js',
    }
};
