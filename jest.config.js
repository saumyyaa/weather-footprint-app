
// jest.config.js
module.exports = {
    transformIgnorePatterns: [
      "/node_modules/(?!axios)/", // transform axios for ES modules
    ],
    testEnvironment: "jsdom",
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    }
  };
  