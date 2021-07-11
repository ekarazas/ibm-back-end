const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  transports: [
    new transports.File({
      level: "info",
      filename: "loggedUserActions.log",
      format: format.combine(
        format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
        format.json()
      ),
    }),
  ],
});

module.exports = logger;
