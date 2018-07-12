let envConfig = require(`../envConfig`),
    logger = require (`../logger`)

const DB_ENV_VARIABLES = Object.freeze({
    MONGO_CONNECTION_URI: "MONGO_CONNECTION_URI"
})

// Get Current Environment Settings
envConfig.configure()
const parsedEnvSettings = envConfig.getSettings().parsed

module.exports = {
    mongoUrl: parsedEnvSettings[DB_ENV_VARIABLES.MONGO_CONNECTION_URI]
}