import { Identifiable } from '../abstractions/identifiable.js';

export class Metadata extends Identifiable {
    constructor(field, type, value) {
        super();
        this.validateRequiredFields(field, type, value);
        this.field = field;
        this.type = type;
        this.value = value;
    }

    validateRequiredFields(field, type, value) {
        if (!field) {
            throw new Error('Field is required');
        }

        if (!type) {
            throw new Error('Type is required');
        }

        if (!value) {
            throw new Error('Value is required');
        }
    }
}