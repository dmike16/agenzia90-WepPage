import { ModeStyle, hashFormatStyle } from "./utils";
import * as webpack from "webpack";
import pkg from "../../../lib/package";

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require("autoprefixer");

export default function (mode: ModeStyle): webpack.Configuration {
    const hashStyle = hashFormatStyle(mode === 'development' ? 'none' : 'all');
    const extraPlugins = [];
    if (pkg.buildCtx.extractCss) extraPlugins.push(
        new MiniCssExtractPlugin({
            filename: `[name][${hashStyle.chunk}].css`,
            chunkFilename: `[id][${hashStyle.chunk}].css`
        })
    );

    const stylesEntryPoint = pkg.buildCtx.styles.reduce<{ [key: string]: string }>(
        (acc, style) => {
            acc[style.name] = style.path;
            return acc;
        }
        , {}
    );

    return {
        entry: stylesEntryPoint,
        optimization: {
            minimizer: [
                ...(pkg.buildCtx.optimizeCss ? [new OptimizeCSSAssetsPlugin(
                    {
                        cssProcessorOptions:
                        {
                            map: {
                                inline: false
                            }
                        }
                    }
                )] : [])
            ]
        },

        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        { loader: pkg.buildCtx.extractCss ? MiniCssExtractPlugin.loader : 'style-loader' },
                        { loader: 'raw-loader' }, // FIXME(dmike16): check the correct behavoir when used in combination with MiniCssExtract
                        {
                            loader: 'postcss-loader'
                            , options: {
                                ident: 'postcss',
                                plugins: postcssPlugins,
                                sourceMap: pkg.buildCtx.inlineSource ? 'inline' : true
                            }
                        },
                        {
                            loader: 'sass-loader'
                            , options: {
                                sourceMap: true
                            }
                        }
                    ]
                }
            ],
        },

        plugins: [
            ...extraPlugins
        ]

    };
}

function postcssPlugins(loader: webpack.loader.LoaderContext): any[] {
    return [
        autoprefixer({ grid: true })
    ]
}
