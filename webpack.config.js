const path = require("path");

const loader1 = (source) => {
  console.log("loader1");
  return source + "//给你的代码加点注释：loader1";
};

const loader2 = (source) => {
  console.log("loader2");
  return source + "//给你的代码加点注释：loader2";
};

//自定义插件WebpackRunPlugin
class WebpackRunPlugin {
  apply(compiler) {
    compiler.hooks.run.tap("WebpackRunPlugin", () => {
      console.log("开始编译");
    });
  }
}

//自定义插件WebpackDonePlugin
class WebpackDonePlugin {
  apply(compiler) {
    compiler.hooks.done.tap("WebpackDonePlugin", () => {
      console.log("结束编译");
    });
  }
}

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  devtool: "source-map",
  plugins: [new WebpackRunPlugin(), new WebpackDonePlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [loader1, loader2],
      },
    ],
  },
};
