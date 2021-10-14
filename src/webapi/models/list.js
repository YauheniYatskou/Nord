import { Identifiable } from '../abstractions/identifiable';

export class Cell extends Identifiable {
    constructor(value) {
        super();
        this.value = value;
    }
}

export class Row extends Identifiable {
    constructor(cells = []) {
        super();
        this.cells = cells;
    }
}

export class List extends Identifiable {
    constructor(rows = []) {
        super();
        this.rows = rows;
    }
}