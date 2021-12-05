export class Metadata {
    constructor(field, type, value) {
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
