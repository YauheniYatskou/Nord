import { addEntityRoutes } from './routes/index.js';
import { getExpressInstance } from './core/configuration/express.js';
import { getConfigurationValue } from './core/configuration/get-configuration-value.js';
import { configurationFieldNames } from './core/configuration/configuration-field-names.js';
import morgan from 'morgan';
import { logger } from './core/logging/logger.js';
import { StatusCodes, Environments } from './core/index.js';
import express from 'express';

const app = getExpressInstance();
const version = getConfigurationValue(configurationFieldNames.version);
const environment = getConfigurationValue(configurationFieldNames.environment);
const message = `Nord webapi of version '${version}' running in '${environment}' environment.`;
app.use(morgan('combined', { stream: logger.stream }));
app.use(express.json());

app.get('/', (request, response) => {
    response.send(message);
});

addEntityRoutes(app);

app.all('*', (req, res, next) => {
    const error = new Error(`Can't find ${req.originalUrl} on this server!`);
    error.statusCode = StatusCodes.notFound;
    error.status = 'not found';
    next(error);
});

// 'next' argument is required for error handler to be treated as error handler and thus to work properly
// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
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
app.listen(port, () => {
    logger.info(message);
});
