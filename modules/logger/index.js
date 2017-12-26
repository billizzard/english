const winston = require('winston');
const LOGS_DIR = __dirname + '/../../logs/';

// winston.loggers.add('push', {
//     console: {
//         level: 'error',
//         colorize: true
//     },
//     file: {
//         filename: LOGS_DIR + 'push.log',
//         maxsize: 5000000
//     }
// });

// const logger = winston.createLogger({
//     level: 'info',
//     format: winston.format.json(),
//     transports: [
//         //
//         // - Write to all logs with level `info` and below to `combined.log`
//         // - Write all logs error (and below) to `error.log`.
//         //
//         new winston.transports.File({ filename: 'error.log', level: 'error' }),
//         new winston.transports.File({ filename: 'combined.log' })
//     ]
// });



winston.loggers.add('dev', {
    console: {
        level: 'error',
        colorize: true
    },
    file: {
        filename: LOGS_DIR + 'logs.log',
        timestamp: true,
        maxsize: 5000000
    },
});

winston.loggers.add('prod', {
    file: {
        filename: LOGS_DIR + 'logs.log',
        timestamp: true,
        maxsize: 5000000
    },
});

module.exports = {
    dev: winston.loggers.get('dev'),
    prod: winston.loggers.get('prod'),
};