import { generateUuid } from './generate-uuid.js';

export class Identifiable {
    constructor() {
        this.id = generateUuid();
    }
}
