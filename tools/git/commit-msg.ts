import { createReadStream } from "fs";
import { Observable, Subscriber } from "rxjs";
import { map, takeLast } from "rxjs/operators";
import { Logger } from "../logger";

export class CommitMsgValidator {

    private pattern: RegExp = /^(\w+)(?:\(([^)]+)\))?\: (?:.+)$/;
    private revert: RegExp = /^revert:? /i;
    constructor(private fileName: string, private log: Logger) { }

    validate(): Observable<boolean> {
        return this.observeHeader()
            .pipe(
                takeLast(1),
                map<string, boolean>((header) => {
                    this.log.info(header);
                    if (this.revert.test(header)) {
                        this.log.info("Revert commit accept.");
                        return true;
                    }

                    const match = this.pattern.exec(header);
                    if (!match) {
                        this.logError(header, `The commit message does not match the pattern ${template}.`);
                        return false;
                    }

                    const type = match[1];
                    if (!types[type]) {
                        this.logError(header, `The type ${type} is not allowed -> TYPES:
                        ${Object.keys(types).filter((key) => types[key]).join(" , ")}`);
                        return false;
                    }

                    const typeObj = types[type];
                    const scope = match[2];
                    if (typeObj.hasScope && !scopes[scope]) {
                        this.logError(header, `The scope ${scope} is not allowed -> SCOPES:
                        ${Object.keys(scopes).filter((key) => scopes[key]).join(" , ")}`);
                        return false;
                    }
                    return true;
                }));
    }

    private logError(header: string, errorMessage: string): void {
        this.log.error(` *INVALID COMMIT MSG: ${header}\n`, `*ERROR: ${errorMessage}`);
    }

    private observeHeader(): Observable<string> {
        return Observable.create((subscriber: Subscriber<string>) => {
            const commitFile = createReadStream(this.fileName, { encoding: "utf-8" });
            commitFile.once("error", (err) => err && subscriber.error(err.message));
            commitFile.once("end", () => subscriber.complete());
            commitFile.on("readable", () => {
                const header: string[] = [];
                let data: string = null;
                let foundHeader = false;
                while (!foundHeader && (data = commitFile.read())) {
                    const idxBreakLine = data.indexOf("\n");
                    if (idxBreakLine > -1) {
                        foundHeader = true;
                        header.push(data.substring(0, idxBreakLine));
                        subscriber.next(header.join(""));
                        commitFile.emit("end");
                        break;
                    } else {
                        header.push(data);
                    }
                }
            });
            return () => commitFile.destroy();
        });
    }
}

const template = "'<type>(<scope>): <subject>' OR 'Revert: <type(<scope>): <subject>'";

const types: { [key: string]: { desc: string; hasScope: boolean; } } = {
    feat: {
        desc: 'A new app feature.',
        hasScope: true
    },
    fix: {
        desc: 'A bug fix.',
        hasScope: true
    },
    refactor: {
        desc: 'A code change that not add a new feature or fix a bug.',
        hasScope: true
    },
    style: {
        desc: 'A change that is not related to the code (formatting only).',
        hasScope: true
    },
    docs: {
        desc: 'A change related to documentation only',
        hasScope: true
    },
    build: {
        desc: 'Everything related to build process.',
        hasScope: false
    }
};

const scopes: { [key: string]: string } = {
    app: "The root scope"
}
