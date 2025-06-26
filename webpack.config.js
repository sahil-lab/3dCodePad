const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        // Polyfill Node.js process for browser and inject env variable
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new webpack.DefinePlugin({
            'process.env.REACT_APP_OPENAI_API_KEY': JSON.stringify(process.env.REACT_APP_OPENAI_API_KEY || ''),
        }),
    ],
    resolve: {
        alias: {
            'three-mesh-bvh': path.resolve(__dirname, 'node_modules/three-mesh-bvh')
        },
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 3000,
        open: true,
        hot: false,
        liveReload: false,
        historyApiFallback: true,
    },
}; 