const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
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