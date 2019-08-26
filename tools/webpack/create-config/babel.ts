import { ModeStyle } from "./utils";
import * as webpack from "webpack";
import pkg from "../../../lib/package";

export default function(mode: ModeStyle): webpack.Configuration {
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
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env",
                                {
                                    targets: {
                                        esmodules: true
                                    },
                                    modules: false,
                                    useBuiltIns: 'entry',
                                    corejs: '3.2.1'
                                }],
                            "@babel/preset-flow",
                            "@babel/preset-react"],
                            plugins: ["@babel/plugin-syntax-dynamic-import", "react-hot-loader/babel"]
                    }
                }
            ]
        }
    };
}
