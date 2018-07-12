let _env = require(`dotenv`),
    logger = require(`./logger`),
    path = require(`path`)

const ENV_TYPES = Object.freeze({
    LOCAL: "local"
})

let appSettings = {},
    setAppSettings = (settings) => appSettings = settings,
    getAppSettings = () => appSettings

// Checks if provided environment is valid
let checkEnvironmentValidity = () => process.env.ENV && Object.values(ENV_TYPES).indexOf(process.env.ENV) >= 0

let setupEnvironment = () => {
    var filePath = path.resolve(__dirname, "./.env")
    logger.info ( filePath )  
    return _env.config({
        path: filePath
    })
} 

let configureEnvironment = () => {
    const appSettings = setupEnvironment()
    if (appSettings.error || !checkEnvironmentValidity()) {
        if (appSettings.error) logger.info(`${appSettings.error}`)
        throw new Error(`Could not set up the desired environment.`)
    }
    setAppSettings(Object.assign(appSettings))
}

module.exports = {
    getSettings: getAppSettings,
    configure: configureEnvironment
}