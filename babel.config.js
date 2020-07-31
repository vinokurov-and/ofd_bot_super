module.exports = {
  presets: [
    [
      "@babel/env",
      {
        targets: {
          node: "current",
        },
        useBuiltIns: "usage",
      },
    ],
  ],
  plugins: ["@babel/plugin-syntax-dynamic-import"],
};
