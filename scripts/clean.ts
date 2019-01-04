import { Logger } from "../tools/logger";
import { join } from "path";
import pkg from "../lib/package";

const del = require('del');

export default async function(args: any, log: Logger){
    log.info("Cleaning project");
    const dirToclean = join(pkg.root, 'build');
    await del(dirToclean);
    return 0;
}
