const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'public')
};

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: PATHS.source + '/js/app.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    publicPath: '/',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: './postcss.config.js',
                                }
                            }
                        }
                    ]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    publicPath: '/',
                    use: 'css-loader',
                }),
            },
        ]
    },
    output: {
        path: PATHS.build,
        filename: 'js/[name].js'
    },
    plugins: [
        new ExtractTextPlugin('./css/[name].css'),
    ],
};