import * as winston from "winston"

export const loggerInfo = winston.createLogger({
    level:"info",
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: "./logs/info.log",
            level:"info"
        })
    ]
})

export const loggerError = winston.createLogger({
    level:"error",
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: "./logs/error.log",
            level:"error"
        })
    ]
})