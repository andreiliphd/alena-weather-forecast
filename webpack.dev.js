const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const DelWebpackPlugin = require('del-webpack-plugin')
const Dotenv = require('dotenv-webpack');


console.log(path.resolve(__dirname, 'src/client/index.js'));
module.exports = {
    entry: path.resolve(__dirname, 'src/client/index.js'),
    mode: 'development',
    optimization: {
        minimizer: [],
        },        
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },  
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            }                        ]
    },
    plugins: [
        new DelWebpackPlugin({
            include: ['**'],
            exclude: ['test.js'],
            info: true,
            keepGeneratedAssets: true,
            allowExternal: false
          }),
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'src/client/views/index.html'),
            filename: path.resolve(__dirname, 'dist/index.html'),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new WorkboxPlugin.GenerateSW(),
        new Dotenv()
    ]
}
