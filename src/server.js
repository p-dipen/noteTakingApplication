const http = require('http');
const fs = require('node:fs');
const bodyParser = require('body-parser');
function middleWare(request, response, fn) {
  var chunks = [];
  request.on('data', function (chunk) {
    chunks.push(chunk);
  });
  request.on('end', function () {
    const data = Buffer.concat(chunks);
    const queryString = data.toString();
    const parsedData = new URLSearchParams(queryString);
    const dataObj = {};
    for (var pair of parsedData.entries()) {
      dataObj[pair[0]] = pair[1];
    }

    console.log('dataObject', dataObj);
    request.body = dataObj;
    return fn(request, response);
  });
}

function formatNotes(notes) {
  var htmlNotes = '';
  for (let i = 0; i < notes.length; i++) {
    var tempNote = notes[i];
    var tempStr = `<div class="note">${tempNote.note}</div>`;
    htmlNotes += tempStr + '\n';
  }
  return htmlNotes;
}

const bodyParserText = bodyParser.text({ type: 'text/html' });
const bodyParserJSON = bodyParser.json({ type: 'aplication/*+json' });

function mainFunction(request, response) {
  const url = request.url;
  const method = request.method;
  console.log('This is called', method);
  if (url == '/' && method == 'GET') {
    const HTMLPATH = './src/template.html';

    var indexHtml = fs.readFileSync(HTMLPATH, 'utf-8');
    indexHtml = indexHtml.replace('{{notes}}', formatNotes(notes));
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end(indexHtml);
  } else if (url == '/' && method == 'POST') {
    console.log('requestBody', request.body);
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Successfully');
  } else if (url == '/notes') {
    const HTMLPATH = './src/template.html';

    var indexHtml = fs.readFileSync(HTMLPATH, 'utf-8');
    indexHtml = indexHtml.replace('{{notes}}', formatNotes(notes));
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end(indexHtml);
  } else {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/html');
    response.end(`Not Found`);
  }
}

function start(notes) {
  const server = http.createServer(function (request, response) {
    return middleWare(request, response, mainFunction);
  });
  server.on('request', function (req, res) {
    console.log('THis is second request');
  });
  server.listen(3000, function () {
    console.log('Server running on port 3000');
  });
}
module.exports = {
  start,
};
