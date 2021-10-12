import { generateUuid } from '../utils/generateUuid';

export class File {
    constructor(name, extension, data, metadata = [], files = [], entities = []) {
        this.validateRequiredFields(name, extension, data);
        this.id = generateUuid();
        this.name = name.trim();
        this.extension = extension.trim();
        this.data = data;
        this.metadata = metadata;
        this.files = files;
        this.entities = entities;
    }

    validateRequiredFields(name, extension, data) {
        if (!name && !extension) {
            throw Error('Name or extenion is required');
        }

        if (!data || !data.byteLength) {
            throw Error('Data is required');
        }
    }
}