const path = require('path');

module.exports = {
    entry: './src/index.js',
    
    output: {
        filename: 'bundle.js'
    },

    devServer: {
        contentBase: path.join(__dirname, 'www'),
        compress: false,
        publicPath: '/',
        port: 9000,
        open: true,
        hot: true
    },

    devtool: 'source-map'
}