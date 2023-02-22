const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf((info) => {
      const { timestamp, level, message, ...args } = info;

      return `| \x1b[34m${timestamp} ${level}: «${message}» ${
        Object.keys(args).length ? JSON.stringify(args, null, 2) : ""
      }`;
    })
  ),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
