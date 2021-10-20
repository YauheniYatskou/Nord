import { Identifiable } from '../common/identifiable.js';

export class File extends Identifiable {
    constructor(name, extension, data, metadata = []) {
        super();
        this.validateRequiredFields(name, extension, data);
        this.name = name.trim();
        this.extension = extension.trim();
        this.data = data;
        this.metadata = metadata;
    }

    validateRequiredFields(name, extension, data) {
        if (!name && !extension) {
            throw new Error('Name or extenion is required');
        }

        if (!data || !data.byteLength) {
            throw new Error('Data is required');
        }
    }
}
