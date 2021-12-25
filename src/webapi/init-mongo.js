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

printjson(result);

if (error) {
    print('Error, exiting');
    quit(1);
}