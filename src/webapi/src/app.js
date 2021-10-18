import { getDatabaseInstance } from './utils/database.js';
import { addEntityRoutes } from './entity/index.js';
import { getExpressInstance } from './utils/express.js';
import { getConfigurationValue } from './configuration/get-configuration-value.js';
import { configurationFieldNames } from './configuration/configuration-field-names.js';
import morgan from 'morgan';
import { logger } from './logger/logger.js';
import { StatusCodes, Environments } from './common/index.js';
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

const database = await getDatabaseInstance();

app.get('/goal', (request, response, next) => {
    try {
        response.send(database.data.goals);
    } catch (error) {
        next(error);
    }
});

app.get('/file', (request, response, next) => {
    try {
        response.send(database.data.files);
    } catch (error) {
        next(error);
    }
});

app.get('/list', (request, response, next) => {
    try {
        response.send(database.data.lists);
    } catch (error) {
        next(error);
    }
});

app.all('*', (req, res, next) => {
    const error = new Error(`Can't find ${req.originalUrl} on this server!`);
    error.statusCode = StatusCodes.notFound;
    error.status = 'not found';
    next(error);
});

app.use((error, request, response, next) => {
    logger.error(error);
    error.statusCode = error.statusCode || StatusCodes.internalServerError;
    error.status = error.status || 'error';

    const result  = {
        status: error.status,
        message: error.message
    };

    if (getConfigurationValue(configurationFieldNames.environment) !== Environments.production) {
        result.stack = error.stack;
    }

    response.status(error.statusCode).json(result);
});
const port = getConfigurationValue(configurationFieldNames.port);
app.listen(port, () => {
    logger.info(message);
});
