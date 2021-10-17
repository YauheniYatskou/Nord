import express from 'express';
import { getDatabase } from './dataAccess/database.js';
import process from 'process';

const app = express();
const port = 3000;
const message = `webapi version '${process.env.npm_package_version}' successfully running`;
const database = await getDatabase();

app.get('/', (request, response) => {
    response.send(message);
});

app.get('/entities', (request, response) => {
    response.send(database.data.entities);
});

app.get('/goals', (request, response) => {
    response.send(database.data.goals);
});

app.get('/files', (request, response) => {
    response.send(database.data.files);
});

app.get('/lists', (request, response) => {
    response.send(database.data.lists);
});

app.listen(port, () => {
    console.log(message);
});
