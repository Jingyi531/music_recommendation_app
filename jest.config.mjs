export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.js$": "babel-jest", // Use Babel to transform JS files
  },
  moduleFileExtensions: ["js", "json", "jsx", "node"],
  testMatch: ["**/tests/**/*.test.js"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
};