import { Entity } from '../models/entity.js';
import _ from 'lodash';
import { patch } from '../core/functions/patch.js';

export class EntityService {
    data = [];
    async getEntities() {
        return this.data;
    }

    async createEntity(name, type, metadata) {
        const entity = new Entity(name, type, metadata);
        this.data.push(entity);
        return entity;
    }

    async deleteEntity(entityId) {
        const entity = this.data.find((e) => e.id === entityId);
        this.data = _.remove(this.data, (entity) => entity.id === entityId);
        return entity;
    }

    async patchEntity(entityId, fieldValues) {
        let entity = this.data.find((e) => e.id === entityId);
        const fields = _.remove(
            ['name', 'type', 'metadata'],
            (field) => fieldValues[field] !== undefined
        );
        entity = patch(entity, fieldValues, fields);

        return entity;
    }
}
