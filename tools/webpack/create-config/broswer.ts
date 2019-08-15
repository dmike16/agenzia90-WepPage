import { ModeStyle } from "./utils";
import * as webpack from "webpack";
import pkg from "../../../lib/package";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

export default function (mode: ModeStyle): webpack.Configuration {
    const terserOptions = {
        ecma: pkg.buildCtx.target === 'es2015' ? 6 : 5,
        sourceMap: true,
        safari10: true,
        output: {
            ascii_only: true
        }
    };

    return {
        entry: {
            ...pkg.buildCtx.entryPoints
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    include: pkg.buildCtx.src,
                    use: {
                        loader: 'html-loader'
                    }
                }
            ]
        },
        optimization: {
            minimizer: [new TerserPlugin({
                parallel: mode === 'production',
                sourceMap: true,
                terserOptions
            })],
            runtimeChunk: 'single', // extract webpack boilerplate
            splitChunks: {
                maxAsyncRequests: Infinity,
                cacheGroups: {
                    vendors: false,
                    vendor: {
                        name: 'vendor',
                        enforce: true,
                        reuseExistingChunk: true,
                        chunks: 'initial',
                        test(module, chunks) {
                            const moduleName = module.nameForCondition ? module.nameForCondition() : '';
                            return /[\\/]node_modules[\\/]/.test(moduleName)
                                && !chunks.some(({ name }: { name: string }) => name === 'polyfills');
                        }
                    },
                    default: {
                        chunks: 'async',
                        minChunks: 2,
                        priority: 5
                    },
                    common: {
                        name: 'common',
                        minChunks: 2,
                        priority: 2,
                        chunks: 'async'
                    }
                }
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "index.html",
                xhtml: true
            })
        ]
    };
}
