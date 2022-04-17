const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var path = require('path');

const jsPath = './js';
const cssPath = './scss';
const outputPath = 'dist';
const localDomain = 'http://localhost';
const entryPoints = {
    'coral': jsPath + '/coral.js',
    'styles': cssPath + '/coral.scss',
};

module.exports = {
    entry: entryPoints,
    output: {
        path: path.resolve(__dirname, outputPath),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'Coral',
        libraryExport: 'default'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new BrowserSyncPlugin({
            proxy: localDomain,
            files: [outputPath + '/*.css'],
            injectCss: true,
        }, { reload: false, }),
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif|woff|woff2|eot|ttf|svg)$/i,
                use: 'url-loader?limit=1024'
            }
        ]
    },
};