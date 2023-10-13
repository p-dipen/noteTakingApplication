const fs = require('node:fs/promises');

const DB_PATH = './data/db.json';

function getDB() {
  return fs.readFile(DB_PATH, 'utf-8');
}
function getNotes() {
  return getDB().then(function (databaseData) {
    var db = JSON.parse(databaseData);
    return db.notes;
  });
}
function saveDB(data) {
  console.log('Save Db is called');
  return fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

function insert(data) {
  if (data == '') {
    throw new Error('Data is null');
  }
  return getDB()
    .then(function (databaseData) {
      var db = JSON.parse(databaseData);
      var newObj = { id: db.notes.length + 1, note: data };
      db.notes.push(newObj);
      return db;
    })
    .then(saveDB);
}

function update(data, id) {
  if (data == '') {
    throw new Error('Data is null');
  }
  return getDB()
    .then(function (databaseData) {
      // I am getting database in variable db
      var db = JSON.parse(databaseData);
      for (let i = 0; i < db.notes.length; i++) {
        var noteObj = db.notes[i];
        if (noteObj.id == id) {
          console.log('Matching object', noteObj);
          noteObj.note = data;
        }
      }
      // I am returning the same variable
      return db;
    })
    .then(saveDB)
    .then(function () {
      console.log('Update successfully');
    });
}
function search(str) {
  if (str == '') {
    throw new Error('Data is null');
  }
  return getDB().then(function (databaseData) {
    var db = JSON.parse(databaseData);
    var notes = db.notes;
    var returnArrString = [];
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].indexOf(str) > -1) {
        returnArrString.push(notes[i]);
      }
    }
    return returnArrString;
  });
}
module.exports = {
  getDB,
  insert,
  search,
  update,
  getNotes,
};
/*
Any database have 4 operation 
CRUD
C = Create
R = Read
U = Update 
D = Delete
*/
