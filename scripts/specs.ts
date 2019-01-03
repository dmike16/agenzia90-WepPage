import { Logger } from "../tools/logger";
import { bindNodeCallback } from "rxjs";
import { join } from "path";

const markdowPdf = require('markdown-pdf');

export default async function (args: any, root: string, log: Logger) {
    log.info("Generate specifications");
    const specMd = join(root, 'docs', 'project.md');
    const specPdf = join(root, 'build', 'project.pdf');
    const pdfGenerator = markdowPdf().concat.from(specMd).to;
    const mdToPdf = bindNodeCallback(pdfGenerator);

    await mdToPdf(specPdf).toPromise();

    return 0;
}
