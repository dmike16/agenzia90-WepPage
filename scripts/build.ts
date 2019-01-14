import { Logger } from "../tools/logger";
import { WebpackCompilationOutput, webpackBundle } from "../tools/webpack/compiler";

export default async function(args: any, log: Logger) {
    log.info("FIXME(dmike16): create webpack configuratiion");
    try {
        const bundle: WebpackCompilationOutput = await webpackBundle({});
        log.info(bundle.result);
    }catch(err) {
        log.error(err.error);
        return 1;
    }

    return 0;
}
