let envConfig = require(`./envConfig`)


utils = {
    loadConfiguration: function () {
        // Get Current Environment Settings
        envConfig.configure()
        const parsedEnvSettings = envConfig.getSettings().parsed
        return parsedEnvSettings
    },
    cleanDb: function (Model, callback) {
        Model.find().remove(function (err) {
            if (err) {
                throw err;
            }
            callback();
        });
    }
}

module.exports = utils