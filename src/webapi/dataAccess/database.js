import { JSONFile, Low } from 'lowdb';

export class Data {
    constructor(goals = [], files = [], entities = []) {
        this.goals = goals;
        this.files = files;
        this.entities = entities;
    }
}

export const getDatabase = async () => {
    const fileName = 'meta.json';
    const adapter = new JSONFile(fileName);
    const database = new Low(adapter);
    await database.read();
    database.data ||= new Data();

    return database;
};
