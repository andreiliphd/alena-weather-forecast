const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
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
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'src/client/views/index.html'),
            filename: path.resolve(__dirname, 'dist/index.html'),
        }),
        new WorkboxPlugin.GenerateSW(),
        new Dotenv()
    ],
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(s(a|c)ss)$/,
                use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader']
             }
           ]
    }
}
