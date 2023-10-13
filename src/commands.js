const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const db = require('./db');
const server = require('./server');

yargs(hideBin(process.argv))
  .command(
    'get',
    'get all notes',
    function () {},
    function (argv) {
      console.log(`Get`, argv);
      return db.getDB().then(function (data) {
        console.log(`output`, data);
      });
    },
  )
  .command(
    'new <note>',
    'Create a new note',
    function () {},
    function (argv) {
      console.log(`New `, argv);
      return db
        .insert(argv.note)
        .then(function () {
          console.log('Note Added');
        })
        .catch(function (error) {
          console.error(`Couldnt able to create a note`, error);
        });
    },
  )
  .command(
    'search <string>',
    'Searching in the db',
    function () {},
    function (argv) {
      console.log(`New `, argv);
      return db
        .search(argv.string)
        .then(function (data) {
          console.log(data);
        })
        .catch(function (error) {
          console.error(`Couldnt able to create a note`, error);
        });
    },
  )
  .command(
    'update <id> <data>',
    'Searching in the db',
    function () {},
    function (argv) {
      console.log(`New `, argv);
      return db
        .update(argv.data, argv.id)
        .then(function (data) {
          console.log(data);
        })
        .catch(function (error) {
          console.error(`Couldnt able to create a note`, error);
        });
    },
  )
  .command(
    'web',
    'It will start the server',
    function () {},
    function (args) {
      return db.getNotes().then(function (notes) {
        server.start(notes);
      });
    },
  )
  .demandCommand(1)
  .parse();
