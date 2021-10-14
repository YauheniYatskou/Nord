import { generateUuid } from '../utils/generate-uuid';

export class Identifiable {
    constructor() {
        this.id = generateUuid();
    }
}
