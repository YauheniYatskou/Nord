import { JSONFile, Low } from 'lowdb';
import _ from 'lodash';

export class Data {
    constructor(goals = [], files = [], entities = [], lists = []) {
        this.goals = goals;
        this.files = files;
        this.entities = entities;
        this.lists = lists;
    }
}

const fileName = 'meta.json';
const adapter = new JSONFile(fileName);
const database = new Low(adapter);
await database.read();

export const getDatabaseInstance = async () => {
    if (!database.data) {
        database.data = new Data();
        await database.write();
    }

    return database;
};

export const saveChanges = _.debounce(
    () => {
        database.write();
    },
    250,
    { maxWait: 1000 }
);
