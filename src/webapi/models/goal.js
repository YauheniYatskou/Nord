export class Goal {
    constructor(result, action, nextGoal) {
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