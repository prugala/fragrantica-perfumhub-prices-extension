import path from 'path'

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

import { chromeExtension, simpleReloader } from 'rollup-plugin-chrome-extension'
import { emptyDir } from 'rollup-plugin-empty-dir'
import zip from 'rollup-plugin-zip'
import replace from '@rollup/plugin-replace'
import json from "@rollup/plugin-json";
import pkg from './package.json'

const isProduction = process.env.NODE_ENV === 'production'
const version = process.env.version === '2' ? 'v2' : 'v3'

export default {
  input: `src/manifest_${version}.json`,
  output: {
    dir: 'dist',
    format: 'esm',
    chunkFileNames: path.join('chunks','[name]-[hash].js'),
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': isProduction ? JSON.stringify( 'production' ) : JSON.stringify( 'development' ),
      preventAssignment: true
    }),
    chromeExtension(),
    json(),
    // Adds a Chrome extension reloader during watch mode
    simpleReloader(),
    resolve(),
    commonjs(),
    typescript(),
    // Empties the output dir before a new build
    emptyDir(),
    // Outputs a zip file in ./releases
    isProduction && zip({ file: `../releases/${process.env.version === '2' ? 'firefox' : 'chrome'}-${pkg.name}-${pkg.version}.zip` }),
  ],
}
