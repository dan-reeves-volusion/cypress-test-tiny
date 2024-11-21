const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true,
  videoCompression: 32,
  defaultCommandTimeout: 60000,
  pageLoadTimeout: 60000,
  numTestsKeptInMemory: 0,
  viewportWidth: 1366,
  viewportHeight: 768,
  chromeWebSecurity: false,
  experimentalMemoryManagement: true,
  // experimentalSourceRewriting: true,
  // modifyObstructiveCode: false,
  // experimentalModifyObstructiveThirdPartyCode: true,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  e2e: {
    baseUrl: 'https://www.v1paypaltest3.com',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
});
