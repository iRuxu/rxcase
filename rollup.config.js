export default {
    input: "src/main.js",
    output: {
        file: "fn.js",
        format: "es",
        sourcemap:true
    },
    watch: {
        include: 'src/**'
    }
};
