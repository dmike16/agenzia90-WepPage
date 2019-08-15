import { Logger } from "../tools/logger";
import { WebpackCompilationOutput, webpackBundle } from "../tools/webpack/compiler";
import common from "../tools/webpack/create-config/common";
import assets from "../tools/webpack/create-config/assets";
import styles from "../tools/webpack/create-config/styles";
import broswer from "../tools/webpack/create-config/broswer"
import pkg from "../lib/package";
import babel from "../tools/webpack/create-config/babel";

const merge = require('webpack-merge');

export default async function (args: any, log: Logger) {
    const mode = "production";
    pkg.buildCtx.extractCss = true;
    const configuratiion = [
        common(mode)
        , assets(mode)
        , styles(mode)
        , broswer(mode)
        , babel(mode)
    ];
    try {
        const bundle: WebpackCompilationOutput = await webpackBundle(merge(configuratiion));
        log.info(bundle.result);
    } catch (err) {
        log.error(err.error || err);
        return 1;
    }

    return 0;
}
