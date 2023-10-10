const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const db = require('./db');

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
  .demandCommand(1)
  .parse();
