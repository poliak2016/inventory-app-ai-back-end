import winston from "winston";

const { combine, timestamp, errors, splat, json, colorize, printf, metadata } =
  winston.format;

const isProd = process.env.NODE_ENV === "production";

const devFormat = printf((info) => {
  const { timestamp, level, message } = info;

  const meta = info.metadata && Object.keys(info.metadata).length
    ? ` ${JSON.stringify(info.metadata, null, 2)}`
    : "";

  return `${timestamp} [${level}]: ${message}${meta}`;
});

export const logger = winston.createLogger({
  level: isProd ? "info" : "debug",
  format: combine(
    timestamp(),
    errors({ stack: true }), 
    splat(),                
    metadata({
      fillExcept: ["message", "level", "timestamp", "label"],
    }),
    isProd ? json() : combine(colorize(), devFormat)
  ),
  transports: [new winston.transports.Console()],
});
