import { JSONFile, Low } from 'lowdb';

export class Data {
    constructor(goals = [], files = [], entities = [], lists = []) {
        this.goals = goals;
        this.files = files;
        this.entities = entities;
        this.lists = lists;
    }
}

export const getDatabase = async () => {
    const fileName = 'meta.json';
    const adapter = new JSONFile(fileName);
    const database = new Low(adapter);
    await database.read();
    database.data ||= new Data();
    await database.write();

    return database;
};
