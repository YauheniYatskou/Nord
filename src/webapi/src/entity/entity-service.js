import { getDatabaseInstance, saveChanges } from '../utils/database.js';
import { Entity } from './entity.js';
import _ from 'lodash';
import { notFoundError } from '../errors/index.js';
import { patch } from '../common/patch.js';

export class EntityService {
    async getEntities() {
        const database = await getDatabaseInstance();
        return database.data.entities;
    }

    async createEntity(name, type, metadata) {
        const database = await getDatabaseInstance();
        const entity = new Entity(name, type, metadata);
        database.data.entities.push(entity);
        saveChanges();

        return entity;
    }

    async deleteEntity(entityId) {
        const database = await getDatabaseInstance();
        if (database.data.entities.findIndex(entity => entity.id === entityId) < 0) {
            throw notFoundError('entity', entityId);
        }
        database.data.entities = _.remove(database.data.entities, entity => entity.id === entityId);
        saveChanges();
    }

    async patchEntity(entityId, fieldValues) {
        const database = await getDatabaseInstance();
        let entity = database.data.entities.find(entity => entity.id === entityId);
        const fields = _.remove(['name', 'type', 'metadata'], field => fieldValues[field] !== undefined);
        entity = patch(entity, fieldValues, fields);
        saveChanges();

        return entity;
    }
}
