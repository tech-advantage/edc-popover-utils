const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CleanCSSPlugin = require('less-plugin-clean-css');

module.exports = {
    mode: 'development',
    entry: {
        'edc-popover': './src/index.ts'
    },
    output: {
        path: path.resolve('./dist'),
        filename: 'index.js',
        library: 'edc-popover',
        libraryTarget: 'umd'
    },
    module: {
        // configuration regarding modules
        rules: [
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        configFile: "tsconfig.test.json"
                    }
                }],
                exclude: /node_modules/,
            },
            {
                test: /\.less|\.css$/i,
                use: [
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
        new CleanWebpackPlugin()
    ],
    stats: 'verbose',
}
