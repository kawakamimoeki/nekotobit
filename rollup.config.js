import resolve from 'rollup-plugin-node-resolve';
import stimulus from 'rollup-plugin-stimulus';
 
export default [{
  input: 'frontend/js/main.js',
  output: {
    file: 'assets/js/main.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    stimulus(),
    resolve(),
  ]
}]
