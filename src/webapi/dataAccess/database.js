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

let database;

export const getDatabase = async () => {
    if (!database) {
        const fileName =  'meta.json';
        const adapter = new JSONFile(fileName);
        database = new Low(adapter);
        await database.read();
        if (!database.data) {
            database.data = new Data();
            await database.write();
        }
    }

    return database;
};

export const saveChanges = _.debounce(() => {database.write();}, 250, { maxWait: 1000 });
