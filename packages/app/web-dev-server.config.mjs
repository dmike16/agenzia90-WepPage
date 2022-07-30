import { legacyPlugin } from "@web/dev-server-legacy";
import { fromRollup } from "@web/dev-server-rollup";
import rollupReplace from "@rollup/plugin-replace";

const replace = fromRollup(rollupReplace);

export default {
  open: false,
  watch: false,
  http2: true,
  sslKey: "./server.key",
  sslCert: "./server.crt",
  nodeResolve: {
    exportConditions: ["development"],
  },
  preserveSymlinks: true,
  appIndex: "index.html",
  plugins: [
    replace({
      preventAssignment: true,
      objectGuards: true,
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    // {
    //   name: "base-href-replace",
    //   transform(context) {
    //     if (context.response.is("html")) {
    //       return {
    //         body: context.body.replace(
    //           /<base href="\/"\/>/,
    //           '<base href="build/"/>'
    //         ),
    //       };
    //     }
    //   },
    // },
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
