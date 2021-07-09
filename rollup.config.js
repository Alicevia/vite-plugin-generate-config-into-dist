import { terser } from "rollup-plugin-terser";
export default {
  input: 'src/main.js',
  external:['fs','vite'], 

  output: [
    {file:'dist/index.cjs.js', format: 'cjs' },
    {file:'dist/index.es.js', format: 'es' },
  ],
  plugins:[terser()]
};