import { Metadata } from './metadata.js';
import { generateUuid } from '../core/functions/generate-uuid';

export class Entity {
    constructor(id, name, type, metadata = []) {
        this.id = id || generateUuid();
        this.validateRequiredFields(name, type, metadata);
        this.name = name;
        this.type = type;
        this.metadata = metadata.map(
            (item) => new Metadata(item.field, item.type, item.value)
        );
    }

    validateRequiredFields(name, type, metadata) {
        if (!name) {
            throw new Error('Name is required');
        }

        if (!type) {
            throw new Error('Type is required');
        }

        if (
            metadata &&
            !(
                metadata.length &&
                metadata.findIndex(
                    (item) => !item.field || !item.type || !item.value
                ) < 0
            )
        ) {
            throw new Error('Not all metadata items have required fields');
        }
    }
}
