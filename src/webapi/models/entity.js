import { Identifiable } from '../abstractions/identifiable.js';
import { Metadata } from './metadata.js';

export class Entity extends Identifiable {
    constructor(name, type, metadata = []) {
        super();
        this.validateRequiredFields(name, type, metadata);
        this.name = name.trim();
        this.type = type.trim();
        this.metadata = metadata.map(item => new Metadata(item.field, item.type, item.value));
    }

    validateRequiredFields(name, type, metadata) {
        if (!name) {
            throw new Error('Name is required');
        }

        if (!type) {
            throw new Error('Type is required');
        }

        if (metadata && !(metadata.length && metadata.findIndex(item => !item.field || !item.type || !item.value) < 0)) {
            throw new Error('Not all metadata items have required fields');
        }
    }
}