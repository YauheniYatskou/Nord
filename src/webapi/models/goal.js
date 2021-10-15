import { Identifiable } from '../abstractions/identifiable.js';

export class Goal extends Identifiable {
    constructor(result, action, order) {
        super();
        this.validateRequiredFields(result, action, order);
        this.result = result;
        this.action = action;
        this.order = order;
    }

    validateRequiredFields(result, action, order) {
        if (!result) {
            throw new Error('Result is required');
        }

        if (!action) {
            throw new Error('Action is required');
        }

        if (!order || order < 0) {
            throw new Error('Order must be a positive number');
        }
    }
}