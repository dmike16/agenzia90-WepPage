import { Logger } from "../tools/logger";
import { CommitMsgValidator } from "../tools/git/commit-msg";

export default async function(args: any, root: string, log: Logger){
    const engine = new CommitMsgValidator(process.env["HUSKY_GIT_PARAMS"], log);

    const isValid = await engine.validate().toPromise();

    return isValid ? 0 : 2;
}
