const fs = require('node:fs/promises');

const DB_PATH = './data/db.json';

function getDB() {
  return fs.readFile(DB_PATH, 'utf-8');
}

function saveDB(data) {
  return fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

function insert(data) {
  if (data == '') {
    throw new Error('Data is null');
  }
  return getDB()
    .then(function (databaseData) {
      var db = JSON.parse(databaseData);
      db.notes.push(data);
      return db;
    })
    .then(saveDB);
}
module.exports = {
  getDB,
  insert,
};
/*
Any database have 4 operation 
CRUD
C = Create
R = Read
U = Update 
D = Delete
*/
