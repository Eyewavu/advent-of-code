import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import { terser } from "rollup-plugin-terser"
import pkg from "./package.json" assert { type: "json" }

/** @type {import('rollup').RollupOptions} */
export default {
  input: "./src/index.ts",
  output: {
    name:"index",
    format: "es",
    sourcemap: true,
    dir: "./dist"
  },
  external: ["dotenv/config",...Object.keys(pkg?.dependencies || {})],
  plugins: [
    terser({
      compress: true,
      mangle: true
    }),
    typescript({ declaration:true }),
    resolve({ browser: false })
  ]
}
