import { generateUuid } from '../utils/generate-uuid';

export class Entity {
    constructor(name = '', type = '', metadata = [], files = [], entities = []) {
        this.validateRequiredFields(name, type);
        this.id = generateUuid();
        this.name = name.trim();
        this.type = type.trim();
        this.metadata = metadata;
        this.files = files;
        this.entities = entities;
    }

    validateRequiredFields(name, type) {
        if (!name) {
            throw new Error('Name is required');
        }

        if (!type) {
            throw new Error('Type is required');
        }
    }
}