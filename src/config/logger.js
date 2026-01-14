import winston from 'winston';
import {env} from "./env.js";

const {combine, timestamp, printf, colorize, errors} = winston.format

const logFormat = printf(({level, message, timestamp, stack}) => {
  return `${timestamp} [${level}]: ${stack || message}`
});

export const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: combine(
    timestamp(),
    errors({ stack: true})
  ),
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize(),
        logFormat
      )
    })
  ]
});