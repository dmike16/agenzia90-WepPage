import webpack = require("webpack");

export interface WebpackCompilationOutput {
    error?: string;
    warning?: string;
    result?: string;
}

export function webpackBundle(webpackConfig: webpack.Configuration): Promise<WebpackCompilationOutput> {
    return new Promise((resolve, reject) => {
        webpack(webpackConfig,
            (err: Error, stats) => {
                if (err) {
                    reject({
                        error: err.stack || err.message
                    });
                } else {
                    const info = stats.toJson();
                    if (stats.hasErrors()) {
                        reject({
                            error: info.errors
                        });
                    } else {
                        const out: WebpackCompilationOutput = {};
                        if (stats.hasWarnings()) {
                            out.warning = info.warnings;
                        }
                        out.result = stats.toString({ colors: true });
                        resolve(out);
                    }
                }
            })
    });
}
