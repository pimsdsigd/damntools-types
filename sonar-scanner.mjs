import scanner from "sonarqube-scanner"

scanner(
  {
    serverUrl: "https://sonar.dev.damntools.fr",
    token: process.env.SONAR_TOKEN,
    options: {
      "sonar.projectName": "fr.damntools.npm.types",
      "sonar.projectKey": "fr.damntools.npm.types",
      "sonar.sources": "./src",
      "sonar.tests": "**/*.test.ts",
      // "sonar.exclusions": "**/*.test.ts",
      "sonar.javascript.lcov.reportPaths": "coverage/lcov.info"
    }
  },
  () => process.exit(0)
)
