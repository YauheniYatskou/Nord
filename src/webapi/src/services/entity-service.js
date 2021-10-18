import { getDatabaseInstance, saveChanges } from '../utils/database.js';
import { Entity } from '../models/entity.js';

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
}
