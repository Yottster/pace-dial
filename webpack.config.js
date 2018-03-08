const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new CleanPlugin(['dist']),
        new HtmlPlugin({
            title: 'Pace-Dial',
            template: './src/index.tpl.html'
        })
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'production',
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    }
};