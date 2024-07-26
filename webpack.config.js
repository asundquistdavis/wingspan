const path = require('path');

module.exports = {
    devtool: 'eval-source-map',
    entry: { index: './src/index/index.ts' },
    output: {
        publicPath: '/web',
        filename: '[name].js',
        path: path.join(__dirname, './static/javascript'),
    },
    resolve: {extensions: ['.ts', '.tsx']},
    module: {
        rules: [

            {
                test: /.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                }
            },
            {
                test: /\.(scss)$/,
                use: [
                {loader: 'style-loader'},
                {loader: 'css-loader'},
                {loader: 'sass-loader'},
                ]
            },

        ]
     }
};
