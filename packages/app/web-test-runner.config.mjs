import fs from "fs";
import { legacyPlugin } from "@web/dev-server-legacy";
import { playwrightLauncher } from "@web/test-runner-playwright";
import { fromRollup } from "@web/dev-server-rollup";
import rollupReplace from "@rollup/plugin-replace";

const replace = fromRollup(rollupReplace);

const packages = fs
  .readdirSync("packages")
  .filter((dir) => fs.statSync(`packages/${dir}`).isDirectory());

const browsers = {
  chromium: playwrightLauncher({ product: "chromium", headless: true }),
  firefox: playwrightLauncher({ product: "firefox", headless: true }),
};

export default {
  rootDir: ".",
  files: ["./build/test/**/*.test.js"],
  nodeResolve: true,
  preserveSymlinks: true,
  browsers: Object.values(browsers),
  testFramework: {
    // https://mochajs.org/api/mocha
    config: {
      ui: "bdd",
    },
  },
  groups: packages.map((pkg) => ({
    name: pkg,
    files: `packages/${pkg}/test/**/*.test.js`,
  })),
  plugins: [
    replace({
      preventAssignment: true,
      objectGuards: true,
      "process.env.NODE_ENV": JSON.stringify("test"),
    }),
    legacyPlugin({
      polyfills: {
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
  ],
};
