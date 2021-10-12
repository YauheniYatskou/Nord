export class Goal {
    constructor(result, action, nextGoal) {
        this.result = result;
        this.action = action;
        this.nextGoal = nextGoal;
    }

    validateRequiredFields(result, action) {
        if (!result) {
            throw Error('Result is required');
        }

        if (!action) {
            throw Error('Action is required');
        }
    }
}