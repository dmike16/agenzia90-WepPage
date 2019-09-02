import pkg from "../../../lib/package";
import { hashFormatStyle, sourceMapStyle, mainFiledsResolve, ModeStyle } from "./utils";
import * as webpack from "webpack";

const CleanWebpackPlugin = require('clean-webpack-plugin');

export default function (mode: ModeStyle): webpack.Configuration {
    const hashStyle = hashFormatStyle(mode === 'development' ? 'none' : 'all');
    return {
        mode, // development or production,
        context: pkg.buildCtx.src, // taken from Env Object,
        output: {
            filename: `[name]${hashStyle.chunk}.js`,
            chunkFilename: `[id]${hashStyle.chunk}.js`,
            path: pkg.buildCtx.output.app, // taken from Env Object,
            publicPath: '/'
        },
        devtool: sourceMapStyle(mode),
        // development :'cheap-module-eval-source-map' -- production:'cheap-module-source-map',
        resolve: {
            extensions: ['.js', '.jsx'],
            mainFields: mainFiledsResolve(pkg.buildCtx.target),
            alias: mode === 'development' ? {
                'react-dom': '@hot-loader/react-dom'
            } : {}
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    enforce: 'pre',
                    use: {
                        loader: 'source-map-loader'
                    }
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(pkg.buildCtx.output.app, { root: pkg.root }),
            mode === 'development' ? new webpack.NamedModulesPlugin() : new webpack.HashedModuleIdsPlugin(),
            new webpack.ProgressPlugin()
        ]

    };
}
