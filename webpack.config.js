var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./index.js",
    devtool: 'source-map',
    output: {
        path: __dirname,
        filename: "build/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!autoprefixer-loader!sass-loader?sourceMap")
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("build/[name].css")
    ]
}