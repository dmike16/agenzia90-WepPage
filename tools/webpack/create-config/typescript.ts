import { ModeStyle } from "./utils";
import * as webpack from "webpack";
import pkg from "../../../lib/package";

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

export default function (mode: ModeStyle): webpack.Configuration {
    const enviromentAlias = pkg.buildCtx.enviromentModules.reduce<{ [key: string]: string }>((acc, m) => {
        acc[m.dev] = m.prod;
        return acc;
    }, {});

    return {
        resolve: {
            alias: enviromentAlias
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            configFile: pkg.buildCtx.config
                        }
                    },
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
            new ForkTsCheckerWebpackPlugin({ tsconfig: pkg.buildCtx.config })
        ]
    };
}