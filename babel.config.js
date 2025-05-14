module.exports = {
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          src: "./src",
          "@assets": "./assets",
          "@weather-icons": "./assets/images/weather",
          "@components": "./src/components",
          "@constants": "./src/constants",
          "@hooks": "./src/hooks",
          "@context": "./src/context",
          "@screens": "./src/screens",
          "@utils": "./src/utils",
        },
      },
    ],
  ],
  presets: ["babel-preset-expo", "@babel/preset-typescript"],
};
