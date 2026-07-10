import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";

import {
  addCucumberPreprocessorPlugin,
} from "@badeball/cypress-cucumber-preprocessor";

import {
  createEsbuildPlugin,
} from "@badeball/cypress-cucumber-preprocessor/esbuild";

import mochawesomeReporter from "cypress-mochawesome-reporter/plugin.js";

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.feature",

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      mochawesomeReporter(on);

      return config;
    },
  },

  reporter: "cypress-mochawesome-reporter",

  reporterOptions: {
    reportDir: "cypress/reports",
    charts: true,
    reportPageTitle: "Reporte Cypress",
    embeddedScreenshots: true,
    inlineAssets: true,
  },
});