import { readFileSync } from "fs";

export default function (cert: string, key: string, hot = true): { devServer: any } {
    return {
        devServer: {
            host: 'localhost',
            publicPath: '/',
            https: key && cert ? {
                key: readFileSync(key),
                cert: readFileSync(cert),
                ca: readFileSync(key.replace(/\.key$/, '.pem'))
            } : false,
            port: 4200
        }
    }
}
