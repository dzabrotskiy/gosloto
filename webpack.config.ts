const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PORT = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV !== "production";

import * as webpack from "webpack";

const DIR_ROOT = path.join(__dirname);

import createStyledComponentsTransformer from "typescript-plugin-styled-components";
import console = require("console");

const styledComponentsTransformer = createStyledComponentsTransformer({
    getDisplayName: (filename, bindingName) => {
        return filename
            .substr(filename.indexOf("src") + 4)
            .split("/")
            .join("__")
            .concat("__")
            .concat(bindingName)
            .replace(/tsx/g, "");
    }
});

console.log(`[webpack.config] NODE_ENV:  ${process.env.NODE_ENV}`);
console.log(`[webpack.config] IS DEVELOPMENT: ${isDevelopment}`);
console.log(`[webpack.config] platform:  ${process.platform}`);

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.min.js"
  },
  devServer: {
      hot: true,
      https: false,
      port: PORT,
      stats: "minimal",
      staticOptions: {
        extensions: ["html"]
      }
  },
  resolve: {
    alias: {
        react: path.resolve("./node_modules/react"),
        "react-dom": path.resolve("./node_modules/react-dom"),
        "styled-components": path.resolve("./node_modules/styled-components"),
        "babel-polyfill": path.resolve("./node_modules/babel-polyfill"),
    },
    modules: ["node_modules", "node-modules", __dirname],
    extensions: [".webpack.js", ".web.js", ".ts", ".js", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: [path.join(DIR_ROOT, "src")],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
    },
      {
        test: /\.(ts|tsx)$/,
        include: [path.join(DIR_ROOT, "src")],
        use: [
            {
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [].concat(isDevelopment ? styledComponentsTransformer : []),
                    }),
                    configFile: path.join(DIR_ROOT, "tsconfig.json"),
                    compilerOptions: {
                      module: 'es2015'
                    }
                }
            }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: [
            {
                loader: "style-loader"
            },
            {
                loader: "css-loader"
            },
            {
                loader: "less-loader",
                options: {
                    javascriptEnabled: true,
                }
            }
        ]
    },
    {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
            limit: 10000,
            name: "[name].[ext]?[hash]"
        }
    },
    {
        test: /\.woff(2)?(\?.*)?$/,
        loader: "url-loader",
        options: {
            limit: 10000,
            name: "[name].[ext]?[hash]",
            mimeType: "application/font-woff"
        }
    },
    {
        test: /\.(eot|ttf|wav|mp3)(\?.*)?$/,
        loader: "file-loader"
    },
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.(styl|css)$/,
      minimize: isDevelopment,
      options: {
          postcss: {
              plugins: [require("autoprefixer")]
          }
      }
  }),
  ]
};