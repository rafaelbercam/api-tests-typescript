module.exports = {
    reporter: 'mochawesome',
    reporterOptions: 'json=false,reportDir=../../report,reportFilename=APITestsReport,reportTitle=ServeRestTests,charts=true,code=false',
    spec: ["build/test/*.js"]
}