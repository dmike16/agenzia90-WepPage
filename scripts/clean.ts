import { Logger } from "../tools/logger";
import pkg from "../lib/package";

const del = require('del');

export default async function(args: any, log: Logger){
    log.info("Cleaning project");
    await del(pkg.buildCtx.output.parent);
    return 0;
}
