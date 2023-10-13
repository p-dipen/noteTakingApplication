const http = require('http');
const fs = require('node:fs');

function formatNotes(notes) {
  var htmlNotes = '';
  for (let i = 0; i < notes.length; i++) {
    var tempNote = notes[i];
    var tempStr = `<div class="note">${tempNote.note}</div>`;
    htmlNotes += tempStr + '\n';
  }
  return htmlNotes;
}
function start(notes) {
  const server = http.createServer(function (request, response) {
    console.log('This is called');
    const HTMLPATH = './src/template.html';

    var indexHtml = fs.readFileSync(HTMLPATH, 'utf-8');
    console.log(indexHtml);
    indexHtml = indexHtml.replace('{{notes}}', formatNotes(notes));
    console.log(indexHtml);
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end(indexHtml);
  });
  server.listen(3000, function () {
    console.log('Server running on port 3000');
  });
}
module.exports = {
  start,
};
