import { Logger } from "../tools/logger";
import pkg from "../lib/package";

export default async function(args: any, log: Logger){
    log.info(`********** ${pkg.name} ***********`);
    log.info('https://studio90srls.it');
    log.info('Via Silvestro Gherardi 24');
    log.info(pkg.version);
    log.info('***********************************');

    return 0;
}