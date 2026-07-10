const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");

const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");

const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");


module.exports = defineConfig({

  e2e: {

    specPattern: "cypress/e2e/**/*.feature",

    async setupNodeEvents(on, config) {

      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [
            createEsbuildPlugin(config)
          ],
        })
      );
      require("cypress-mochawesome-reporter/plugin")(on);

      return config;
    },

    reporter: "cypress-mochawesome-reporter",

    reporterOptions: {
      reportDir: "cypress/reports",
      charts: true,
      reportPageTitle: "Reporte Cypress",
      embeddedScreenshots: true,
      inlineAssets: true,
    },

  },
});