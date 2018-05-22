const winston = require('winston')
const { combine, timestamp, label, prettyPrint } = winston.format;
const logger = winston.createLogger({
    format: combine(
        timestamp(),
        winston.format.splat(),
        winston.format.simple(),
        
      ),
      transports: [
        new winston.transports.File({
          filename: 'combined.log',
          level: 'warn'
        }),
        new winston.transports.File({
          filename: 'errors.log',
          level: 'error'
        })
      ]
  });
