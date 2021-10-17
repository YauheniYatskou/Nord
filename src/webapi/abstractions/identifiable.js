import { generateUuid } from '../utils/generate-uuid.js';

export class Identifiable {
    constructor() {
        this.id = generateUuid();
    }
}
