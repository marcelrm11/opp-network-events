module.exports = {
  moduleFileExtensions: ["js", "jsx"],
  moduleNameMapper: {
    "\\.(css)$": "jest-transform-stub",
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "\\.(css)$": "<rootDir>/node_modules/css-loader/dist/cjs.js",
  },
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
};
