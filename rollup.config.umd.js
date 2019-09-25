import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import {nameLibrary,PATH_SRC,PATH_DIST} from './config-library.js';
import multiEntry from 'rollup-plugin-multi-entry';

export default {
  // input: PATH_SRC+nameLibrary+'.ts',
  output: {
    input: 'lib/**/*.ts',
    name: nameLibrary,
    format: 'umd',
    file: PATH_DIST+nameLibrary+".umd.js",
    sourcemap:true,
  },
  external: [ ],
  plugins: [
    multiEntry(),
    typescript({
      typescript:require('typescript')
    }),
    resolve({
      module: true,
      main: true
    }),
     commonjs({
      include: 'node_modules/**',
     })
  ],
   onwarn: warning => {
    const skip_codes = [
      'THIS_IS_UNDEFINED',
      'MISSING_GLOBAL_NAME'
    ];
    if (skip_codes.indexOf(warning.code) != -1) return;
    console.error(warning);
  }
};
