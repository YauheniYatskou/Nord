import { getDatabase, saveChanges } from '../dataAccess/database.js';
import { Entity } from '../models/entity.js';

export class EntityService {
    async getEntities() {
        const database = await getDatabase();
        return database.data.entities;
    }

    async createEntity(name, type, metadata) {
        const database = await getDatabase();
        const entity = new Entity(name, type, metadata);
        database.data.entities.push(entity);
        saveChanges();
        return entity;
    }
}
