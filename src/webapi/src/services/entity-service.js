import { Entity } from '../models/entity.js';
import _ from 'lodash';
import { patch } from '../core/functions/patch.js';

let data = [];
export class EntityService {
    async getEntities() {
        return data;
    }

    async createEntity(name, type, metadata) {
        const entity = new Entity({ name, type, metadata });
        data.push(entity);
        return entity;
    }

    async deleteEntity(entityId) {
        const entity = data.find((e) => e.id === entityId);
        data = _.remove(data, (entity) => entity.id === entityId);
        return entity;
    }

    async patchEntity(entityId, fieldValues) {
        let entity = data.find((e) => e.id === entityId);
        const fields = _.remove(
            ['name', 'type', 'metadata'],
            (field) => fieldValues[field] !== undefined
        );
        entity = patch(entity, fieldValues, fields);

        return entity;
    }
}
