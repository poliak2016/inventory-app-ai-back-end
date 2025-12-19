export default {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.js"],
  transform: {},
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"]
};