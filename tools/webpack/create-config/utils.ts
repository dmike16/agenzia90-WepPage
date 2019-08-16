const utilRegistry = {
    hashStyleRegistry(len: number): { [key: string]: HashStyle } {
        return {
            none: { file: '', chunk: '' },
            all: { chunk: `.[chunkhash:${len}]`, file: `.[hash:${len}]` }
        };
    },
    mainFieldsResolve: {
        es5: ['browser', 'module', 'main'],
        es2015: ['es2015', 'browser', 'module', 'main']
    }
};

export function hashFormatStyle(type: 'none' | 'all', len = 7): HashStyle {
    return utilRegistry.hashStyleRegistry(len)[type];
}

export type HashStyle = { file: string, chunk: string };
export type ModeStyle = 'development' | 'production';

export function sourceMapStyle(mode: 'development' | 'production') {
    return mode === 'development' ? 'cheap-module-eval-source-map' : 'cheap-module-source-map';
}

export function mainFiledsResolve(target: 'es5' | 'es2015'): string[] {
    return utilRegistry.mainFieldsResolve[target];
}
