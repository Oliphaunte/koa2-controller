import pkg from './package.json'
import babel from 'rollup-plugin-babel'

export default {
  input: 'index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
}