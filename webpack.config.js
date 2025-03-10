var path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        path: path.resolve("build"),
        filename: "index.js",
        libraryTarget: "commonjs2",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", ["@babel/preset-react", { runtime: "automatic" }]],
                        plugins: ["@babel/plugin-proposal-private-property-in-object", "@babel/plugin-proposal-class-properties", "@babel/plugin-transform-runtime"],
                    },
                },
            },
            {
                test: /.(scss|css)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: "file-loader",
                options: {
                    outputPath: "images",
                },
            },
        ],
    },
    externals: {
        react: "react",
    },
};
