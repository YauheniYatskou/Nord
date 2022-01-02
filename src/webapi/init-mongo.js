/* eslint-disable no-undef */
/* this script is going to be run within a shell so everything undefined is actually going to be provided to the script*/

let error = true;

let result = [
    db.entity.drop(),
    db.entity.createIndex({ name: 1, type: 1, metadata: 1}),
    db.entity.createIndex({ type: 1}),
    db.entity.createIndex({ uuid: 'hashed' }),
    db.entity.createIndex({ uuid: 1 }, { unique: true }),
];

const rootUser = _getEnv('MONGO_INITDB_ROOT_USERNAME');
const rootPassword = _getEnv('MONGO_INITDB_ROOT_PASSWORD');
const admin = db.getSiblingDB('admin');
admin.auth(rootUser, rootPassword);

const user = _getEnv('MONGO_INITDB_USER');
const password = _getEnv('MONGO_INITDB_PASSWORD');
const database = _getEnv('MONGO_INITDB_DATABASE');
db.createUser({user: user, pwd: password, roles: [{
    role: 'readWrite',
    db: database
}]});

printjson(result);

if (error) {
    print('Error, exiting');
    quit(1);
}