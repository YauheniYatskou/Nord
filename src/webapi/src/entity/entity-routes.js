import { EntityService } from './entity-service.js';
import { getExpressInstance } from '../utils/express.js';

export const addEntityRoutes = (app = getExpressInstance()) => {
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
            const { name, type, metadata } = request.body;
            const entity = await service.createEntity(name, type, metadata);
            response.send(entity);
        } catch (error) {
            next(error);
        }
    });

    app.delete('/entity/:entityId', async (request, response, next) => {
        try {
            const service = new EntityService();
            await service.deleteEntity(request.params.entityId);
            response.send();
        } catch (error) {
            next(error);
        }
    });

    app.patch('/entity/:entityId', async (request, response, next) => {
        try {
            const service = new EntityService();
            const { name, type, metadata } = request.body;
            const fieldValues = { name: name, type: type, metadata: metadata };
            const patchedEntity = await service.patchEntity(
                request.params.entityId,
                fieldValues
            );
            response.send(patchedEntity);
        } catch (error) {
            next(error);
        }
    });
};
