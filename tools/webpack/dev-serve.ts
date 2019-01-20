import * as webpack from "webpack";

const Server = require("webpack-dev-server");

export function webpackServer(webpackConfig: webpack.Configuration): Promise<string> {
    let server: any = null;
    ['SIGINT', 'SIGTERM'].forEach((signal: any) => {
        process.on(signal, () => {
            if (server) {
                server.close(() => {
                    process.exitCode = 0;
                });
            } else {
                process.exitCode = 0;
            }
        });
    });

    const options = (webpackConfig as any).devServer;
    Server.addDevServerEntrypoints(webpackConfig, options);

    return new Promise((resolve, reject) => {
        let compiler: any = null;

        try {
            compiler = webpack(webpackConfig);
            server = new Server(compiler, options)
        } catch (err) {
            reject(err.message);
        }

        server.listen(options.port, options.host, (err: any) => {
            if (err) {
                reject(err.message);
            }
            const uri = `Application serving on 
            ${options.http ? 'https' : 'http'}://${options.host}:${options.port}`
            resolve(uri);
        });
    });
}
