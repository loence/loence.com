const webpack = require('webpack')
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        main: "./src/js/main.js"
    },

    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        modules: [
            path.join(__dirname, "src/scripts"),
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',

                options: {
                    presets: ['env']
                }
            },
            {
                test: /\.ejs$/,
                exclude: /node_modules/,
                loader: 'ejs-compiled-loader?htmlmin'
            },
            {
                test: /\.css$/,

                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            minimize: true
                        }
                    }],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                use: 'file-loader?name=fonts/[name].[ext]!static'
            },
            { test: /\.(html)$/,
                include: path.join(__dirname, 'src/views'),
                use: {
                    loader: 'html-loader',
                    options: {
                        interpolate: true
                    }
                }
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin('style.css'),
        new UglifyJSPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: './src/ejs/index.ejs',
            filename: 'index.html',
            chunks: ['main']

        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: './src/ejs/hrm.ejs',
            filename: 'hrm.html',
            chunks: ['main']

        })]
}