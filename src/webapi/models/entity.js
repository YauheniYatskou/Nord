import { Identifiable } from '../abstractions/identifiable';

export class Entity extends Identifiable {
    constructor(name, type, metadata = [], files = [], entities = []) {
        super();
        this.validateRequiredFields(name, type);
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