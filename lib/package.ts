import { resolve } from "path";

const { version } = require('../package.json');

export type PkgEnv = {
    name: string;
    version: string;
    root: string;
};

export default {
    name: 'studio90srls',
    root: resolve(__dirname, '..'),
    version
} as PkgEnv;