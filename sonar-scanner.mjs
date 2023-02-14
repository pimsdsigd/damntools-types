import scanner from "sonarqube-scanner"

scanner(
  {
    serverUrl: "https://sonar.dev.damntools.fr",
    token: process.env.SONAR_TOKEN,
    options: {
      "sonar.projectName": "fr.damntools.npm.streamable",
      "sonar.projectKey": "fr.damntools.npm.streamable",
      "sonar.sources": "./src",
      "sonar.tests": "./test",
      "sonar.javascript.lcov.reportPaths": "coverage/lcov.info"
    }
  },
  () => process.exit(0)
)
