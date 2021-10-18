import winston from 'winston';
import { getConfigurationValue } from '../configuration/get-configuration-value.js';
import { configurationFieldNames } from '../configuration/configuration-field-names.js';

const { createLogger, transports, format } = winston;

let options = {
    file: {
        level: 'info',
        filename: 'logs/logs.json',
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false,
        prettyPrint: false
    },
    console: {
        level: 'debug',
        colorize: true,
        prettyPrint: true
    }
};

let logger = new createLogger({
    transports: [
        new transports.File(options.file),
        new transports.Console(options.console)
    ],
    exitOnError: false,
    handleExceptions: true,
    format: format.json()
});

logger.stream = {
    write: function(message) {
        logger.info(message);
    }
};

if (getConfigurationValue(configurationFieldNames.environment) !== 'production') {
    logger.transports.push(new transports.Console(options.console));
}

export { logger };