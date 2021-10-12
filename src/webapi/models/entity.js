import { generateUuid } from '../utils/generateUuid';

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
            throw Error('Name is required');
        }

        if (!type) {
            throw Error('Type is required');
        }
    }
}