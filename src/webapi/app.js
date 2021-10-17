import express from 'express';
import { getDatabase } from './dataAccess/database.js';
import process from 'process';
import { log } from './utils/log.js';
import { EntityService } from './services/entity-service.js';

const app = express();
const port = 3000;
const message = `webapi version '${process.env.npm_package_version}' successfully running`;
const database = await getDatabase();

app.use(express.json());

app.get('/', (request, response) => {
    response.send(message);
});

app.get('/entity', async (request, response, next) => {
    try {
        const service = new EntityService();
        const entities = await service.getEntities();
        response.send(entities);
    } catch (error) {
        next(error);
    }
});

app.post('/entity', async (request, response, next) => {
    try {
        const service = new EntityService();
        const entity = await service.createEntity(
            request.body.name,
            request.body.type,
            request.body.metadata
        );
        response.send(entity);
    } catch (error) {
        next(error);
    }
});

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

app.listen(port, () => {
    log(message);
});
