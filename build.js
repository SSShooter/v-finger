var rollup = require('rollup')
var babel = require('rollup-plugin-babel')
var uglify = require('rollup-plugin-uglify')

rollup
  .rollup({
    input: 'lib/index.js',
    plugins: [babel(),uglify()]
  })
  .then(function(bundle) {
    bundle.write({
      file: 'index.js',
      name: 'v-finger',
      format: 'umd'
    })
  })

rollup
  .rollup({
    input: 'lib/forIV.js',
    plugins: [babel(),uglify()]
  })
  .then(function(bundle) {
    bundle.write({
      file: 'indexIV.js',
      name: 'v-finger-IV',
      format: 'umd'
    })
  })
