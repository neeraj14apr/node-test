let logger = require (`../logger`),
    utils = require ('../utils')

const DB_ENV_VARIABLES = Object.freeze({
    MONGO_CONNECTION_URI: "MONGO_CONNECTION_URI"
})

let parsedEnvSettings = utils.loadConfiguration()

module.exports = {
    mongoUrl: parsedEnvSettings[DB_ENV_VARIABLES.MONGO_CONNECTION_URI]
}