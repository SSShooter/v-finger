import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
  input: 'lib/index.js',
  output: {
    file: 'index.js',
    format: 'umd',
    format: 'cjs'
  },
  plugins: [babel(), uglify()]
}
