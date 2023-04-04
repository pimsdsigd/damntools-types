import json from "@rollup/plugin-json"
import dts from "rollup-plugin-dts"
import esbuild from "rollup-plugin-esbuild"

import {createRequire} from "module"

const require = createRequire(import.meta.url)
const pkg = require("./package.json")

export default [
  {
    input: "src/index.ts",
    plugins: [esbuild(), json()],
    output: [
      {file: pkg.main, format: "cjs"},
      {file: pkg.module, format: "es"}
    ],
    external: ["@damntools.fr/optional", "@damntools.fr/utils-simple"]
  },
  {
    input: "src/index.types.ts",
    output: [{file: pkg.types, format: "es"}],
    plugins: [dts()]
  }
]
