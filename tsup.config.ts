import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entryPoints: ["src/index.tsx", "src/assets/gtm.ts"],
  format: ["esm", "cjs"],
  minify: false,
  skipNodeModulesBundle: true,
  sourcemap: true,
  target: "es2021",
});
