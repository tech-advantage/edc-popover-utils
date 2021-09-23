const path = require('path');

// Webpack plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');
const CleanCSSPlugin = require('less-plugin-clean-css');

module.exports = {
    entry: {
        'edc-popover': './src/index.ts'
    },
    output: {
        path: path.resolve('./dist'),
        filename: 'index.js',
        library: 'edc-popover-utils',
        libraryTarget: 'umd'
    },
    module: {
        // configuration regarding modules
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.less|\.css$/i,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        }
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                            sourceMap: true,
                            lessOptions: {
                                plugins: [
                                    new CleanCSSPlugin({ advanced: true }),
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(ttf|eot|svg|gif|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'file-loader?name=[name].[ext]&outputPath=assets/fonts/'
                }]
            },
            {
                test: /\.(jpg|png|gif|svg|ico)$/,
                use: 'file-loader?name=[name].[ext]&publicPath=assets/imgs/&outputPath=assets/imgs/'
            },
            {
                test: /package.json$/,
                use: 'file-loader'
            },
        ]
    },
    resolve: {
        // options for resolving module requests
        // (does not apply to resolving to loaders)
        modules: [
            "node_modules"
        ],
        // directories where to look for modules
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new TSLintPlugin({
            files: ['./src/**/*.ts']
        }),
    ],
    stats: 'verbose',
}
