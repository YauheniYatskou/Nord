import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import { Environments, StatusCodes } from '../constants/index.js';
import { logger } from '../logging/logger.js';
import { configurationFieldNames } from '../configuration/configuration-field-names.js';
import { getConfigurationValue } from '../configuration/get-configuration-value.js';
import { addEntityRoutes } from '../../routes/index.js';

const expressInstance = express();

expressInstance.use(express.json());
expressInstance.use(compression());
expressInstance.use(morgan('combined', { stream: logger.stream }));

const version = getConfigurationValue(configurationFieldNames.version);
const environment = getConfigurationValue(configurationFieldNames.environment);
const message = `entity-api version '${version}' running in '${environment}'.`;

expressInstance.get('/', (request, response) => {
    response.send(message);
});

//TODO: try using router insted
addEntityRoutes(expressInstance);

expressInstance.all('*', (req, res, next) => {
    const error = new Error(`Can't find ${req.originalUrl} on this server!`);
    error.statusCode = StatusCodes.notFound;
    error.status = 'not found';
    next(error);
});

// 'next' argument is required for error handler to be treated as error handler and thus to work properly
// eslint-disable-next-line no-unused-vars
expressInstance.use((error, request, response, next) => {
    logger.error(error);
    error.statusCode = error.statusCode || StatusCodes.internalServerError;
    error.status = error.status || 'error';

    const result = {
        status: error.status,
        message: error.message,
    };

    if (
        getConfigurationValue(configurationFieldNames.environment) !==
        Environments.production
    ) {
        result.stack = error.stack;
    }

    response.status(error.statusCode).json(result);
});

const port = getConfigurationValue(configurationFieldNames.port);

expressInstance.listen(port, () => {
    logger.info(message);
});

export const getExpressInstance = () => expressInstance;
