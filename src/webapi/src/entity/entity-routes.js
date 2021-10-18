import { EntityService } from '../services/entity-service.js';
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

    app.delete('/entity/:entityId', async (request, response, next) => {
        try {
            const service = new EntityService();
            await service.deleteEntity(request.params.entityId);
            response.send();
        } catch (error) {
            next(error);
        }
    });
};
