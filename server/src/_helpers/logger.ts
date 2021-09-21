const { createLogger, transports, format } = require("winston");

const customFormat = format.combine(
  format.errors({ stack: true }),
  format.timestamp(),
  format.printf((info: any) => {
    return `${info.timestamp} [${info.level.toUpperCase()}]: ${
      info.stack || info.message
    }`;
  })
);

const logger = createLogger({
  format: customFormat,
  transports: [
    new transports.Console({ level: "silly" }),
    new transports.File({ filename: "app.log", level: "info" }),
  ],
});

module.exports = logger;
