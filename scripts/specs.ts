import { Logger } from "../tools/logger";
import { bindNodeCallback } from "rxjs";
import { join } from "path";
import pkg from "../lib/package";

const markdowPdf = require('markdown-pdf');

export default async function (args: any, log: Logger) {
    log.info("Generate specifications");
    const specMd = join(pkg.root, 'docs', 'project.md');
    const specPdf = join(pkg.buildCtx.output, 'docs', 'project.pdf');
    const pdfGenerator = markdowPdf().concat.from(specMd).to;
    const mdToPdf = bindNodeCallback(pdfGenerator);

    await mdToPdf(specPdf).toPromise();

    return 0;
}
