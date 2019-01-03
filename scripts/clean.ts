import { Logger } from "../tools/logger";
import { join } from "path";

const del = require('del');

export default async function(args: any, root: string, log: Logger){
    log.info("Cleaning project");
    const dirToclean = join(root, 'build');
    await del(dirToclean);
    return 0;
}
