import { resolve, join } from "path";

const { version } = require('../package.json');
const root = resolve(__dirname, '..')

export type PkgEnv = {
    name: string;
    version: string;
    root: string;
    buildCtx: {
        src: string;
        output: string;
        entryPoints: {[key: string]: any};
        target: string;
        styles: string[];
    };
};

export default {
    name: 'studio90srls',
    root,
    version,
    buildCtx: {
        src: join(root, 'src'),
        output: join(root, 'build'),
        target: 'ES2015',
        entryPoints: {
            main: 'main.ts',
            polyfill: 'polyfill.ts'
        },
        styles: ['app/app.scss']
    }
} as PkgEnv;