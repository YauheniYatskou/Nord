import { Identifiable } from '../abstractions/identifiable';

export class Goal extends Identifiable {
    constructor(result, action, nextGoal) {
        super();
        this.validateRequiredFields(result, action);
        this.result = result;
        this.action = action;
        this.nextGoal = nextGoal;
    }

    validateRequiredFields(result, action) {
        if (!result) {
            throw new Error('Result is required');
        }

        if (!action) {
            throw new Error('Action is required');
        }
    }
}