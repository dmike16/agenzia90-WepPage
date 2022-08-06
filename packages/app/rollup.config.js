import html from "@web/rollup-plugin-html";
import resolve from "@rollup/plugin-node-resolve";
import minifyHtml from "rollup-plugin-minify-html-literals";
import { terser } from "rollup-plugin-terser";
import polyFillsLoader from "@web/rollup-plugin-polyfills-loader";
import summary from "rollup-plugin-summary";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";
import path from "path";
import { copy } from "@web/rollup-plugin-copy";

// Html plugin configuration
const htmlPlugin = html({
  rootDir: "./",
  flattenOutput: false,
  strictCSPInlineScripts: true,
});
const rootDir = path.join(process.cwd(), "..", "..");
export default {
  input: "./index.html",
  plugins: [
    htmlPlugin,
    resolve({
      rootDir,
    }), // Bare module resolver path
    minifyHtml(), // minifyHtml template litterals
    terser({
      module: true,
      warnings: true,
    }), // minify js
    polyFillsLoader({
      // inject polyfiils into html
      modernOutput: {
        name: "modern",
      },
      legacyOutput: {
        name: "legacy",
        test: "!!Array.prototype.flat",
        type: "systemjs",
      },
      polyfiils: {
        hash: true,
        coreJs: true,
        regeneratorRuntime: true,
        fetch: true,
        webcomponents: true,
        custom: [
          {
            name: "lit-polyfill-support",
            path: "node_modules/lit/polyfill-support.js",
            test: "!('attachShadow' in Element.prototype)",
            module: false,
          },
        ],
      },
    }),
    summary(),
    copy({
      patterns: "docs/images/*.{svg,png,jpg,ico}",
    }),
  ],
  output: [
    {
      // modern configuration
      format: "esm",
      chunkFileNames: "[name]-[hash].js",
      entryFileNames: "[name]-[hash].js",
      dir: "build",
      plugins: [htmlPlugin.api.addOutput("modern")],
    },
    {
      // legacy build
      format: "esm",
      chunkFileNames: "legacy-[name]-[hash].js",
      entryFileNames: "legacy-[name]-[hash].js",
      dir: "build",
      plugins: [
        htmlPlugin.api.addOutput("legacy"),
        getBabelOutputPlugin({
          compact: true,
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  ie: "11",
                },
                modules: "systemjs",
              },
            ],
          ],
        }),
      ],
    },
  ],
  preserveEntrySignatures: false,
};
