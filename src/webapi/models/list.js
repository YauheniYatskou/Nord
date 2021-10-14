import { generateUuid } from '../utils/generate-uuid';

export class Cell {
    constructor(value) {
        this.value = value;
    }
}

export class Row {
    constructor(cells = []) {
        this.cells = cells;
    }
}

export class List {
    constructor(rows = []) {
        this.id = generateUuid();
        this.rows = rows;
    }
}