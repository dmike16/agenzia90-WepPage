import { ModeStyle, hashFormatStyle } from "./utils";
import pkg from "../../../lib/package";
import * as webpack from "webpack";

const CopyWebpackPlugin = require('copy-webpack-plugin');

export default function (mode: ModeStyle): webpack.Configuration {
    const hashStyle = hashFormatStyle(mode === 'development' ? 'none' : 'all');

    const extraPLugins = [];

    const assetsOptions = pkg.buildCtx.assets.map((entry) => ({
        context: entry.src, to: entry.dest, from: { glob: entry.glob, dot: true, ignore: entry.ignore }
    }));

    if (assetsOptions.length > 0) extraPLugins.push(
        new CopyWebpackPlugin(assetsOptions, {
            ignore: ['.gitkeep', ' ** /.DS_Store', '**/Thumbs.db']
        })
    )

    return {
        module: {
            rules: [
                {
                    test: /\.(svg|jpg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: { name: `[path][name][${hashStyle.file}].[ext]` }
                        }
                    ]

                },
                {
                    test: /\.(png)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: { limit: 10000 }
                        }
                    ]
                }

            ]
        },
        plugins: [
            ...extraPLugins
        ]
    };
}
