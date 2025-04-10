/**
 * Simple console logger
 */

// Get timestamp in format YYYY-MM-DD HH:mm:ss
const getTimestamp = () => {
  return new Date().toISOString().replace('T', ' ').substring(0, 19);
};

// Simple logger object with console methods
const logger = {
  error: (message, meta = {}) => {
    console.error(`${getTimestamp()} ERROR: ${message}`, Object.keys(meta).length ? meta : '');
  },
  warn: (message, meta = {}) => {
    console.warn(`${getTimestamp()} WARN: ${message}`, Object.keys(meta).length ? meta : '');
  },
  info: (message, meta = {}) => {
    console.info(`${getTimestamp()} INFO: ${message}`, Object.keys(meta).length ? meta : '');
  },
  debug: (message, meta = {}) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`${getTimestamp()} DEBUG: ${message}`, Object.keys(meta).length ? meta : '');
    }
  }
};

export default logger;
