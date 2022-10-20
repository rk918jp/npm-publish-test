import { babel as pluginBabel } from "@rollup/plugin-babel";
import { terser as pluginTerser } from "rollup-plugin-terser";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import multiInput from  "rollup-plugin-multi-input";

import * as path from "path";

import camelCase from "lodash.camelcase";
import upperFirst from "lodash.upperfirst";

import pkg from "./package.json";

const moduleName = upperFirst(camelCase(pkg.name.replace(/^\@.*\//, '')));

const plugins = [
  pluginBabel({
    babelHelpers: "runtime",
    configFile: path.resolve(__dirname, ".babelrc"),
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    exclude: "node_modules/**",
  }),
  nodeResolve({
    browser: true,
    resolveOnly: [],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  }),
  commonjs(),
  pluginTerser({
    format: {
      comments: false
    },
    compress: true,
  }),
];

export default [
  // For ES Module
  {
    input: [
      `src/**/*.(js|jsx)`
    ],
    output: [
      {
        format: "es",
        sourcemap: false,
        exports: "named",
        dir: "dist",
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
    ],
    plugins: [
      ...plugins,
      multiInput.default(),
    ],
  },
  // For CommonJS
  {
    input: "src/index.js",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: false,
        exports: "named",
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
    ],
    plugins,
  },
];