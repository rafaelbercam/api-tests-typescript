module.exports = {
    reporter: 'mochawesome',
    reporterOptions: 'json=false,reportDir=../../report,reportFilename=APITestsReport,reportTitle=ServeRestTests,charts=true',
    spec: ["build/test/*.js"]
}