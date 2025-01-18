import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';  // Corrected import for ESM

const { combine, timestamp, printf } = winston.format;

// Custom log format
const logFormat = printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create the logger
const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    // Console transport (for development only)
    new winston.transports.Console({
      format: combine(
        winston.format.colorize(),
        logFormat
      ),
    }),

    // Daily rotating file transport for general logs
    new DailyRotateFile({
      filename: 'logs/%DATE%-combined.log',
      datePattern: 'YYYY-MM-DD',  // Log file naming pattern
      zippedArchive: true,        // Compress old logs into zipped files
      maxSize: '20m',             // Max size of each log file (20MB)
      maxFiles: '30d',            // Retain logs for 30 days
    }),

    // Error log file with a separate transport
    new DailyRotateFile({
      filename: 'logs/%DATE%-error.log',
      level: 'error',             // Only log errors to this file
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,        // Compress old logs into zipped files
      maxSize: '20m',             // Max size of each log file (20MB)
      maxFiles: '30d',            // Retain logs for 30 days
    }),
  ],
});

// Ensure console logging is active only in non-production environments
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: combine(
      winston.format.colorize(),
      logFormat
    ),
  }));
}

export default logger;