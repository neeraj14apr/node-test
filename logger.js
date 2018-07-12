let logger = require ( 'winston' )

logger.remove ( logger.transports.Console )

// Configure logger colors
logger.addColors({
    debug: "green",
    info: "cyan",
    silly: "magenta",
    warn: "yellow",
    error: "red"
})

logger.add ( new logger.transports.Console(), {
    level : "info", 
    colorize : true
} )

module.exports = logger