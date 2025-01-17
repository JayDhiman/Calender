import morgan from 'morgan';
import logger from './logger.js';  // Import the Winston logger

// Define the Morgan format (common format with ISO date)
const morganFormat = ':method :url :status :response-time ms - :res[content-length] :date[iso]';

// Create a Morgan middleware that logs to Winston
const morganMiddleware = morgan(morganFormat, {
  stream: {
    write: (message) => {
      // Log HTTP requests using Winston's info level
      // Log errors with status codes 5xx as error level
      const statusCode = message.split(' ')[2]; // Extract the status code from the log message
      if (parseInt(statusCode) >= 500) {
        logger.error(message.trim());  // Log errors at 'error' level for 5xx status codes
      } else {
        logger.info(message.trim());
      }
    },
  },
});

export default morganMiddleware;
