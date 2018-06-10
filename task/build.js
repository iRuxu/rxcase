const shell = require('shelljs');

shell.exec('rollup --config ./build/rollup.config.js')
shell.exec('rollup --config ./build/rollup.config.umd.js')
shell.exec('rollup --config ./build/rollup.config.cjs.js')
