const fs = require('fs');
// pull in the file system module
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const favicon = fs.readFileSync(`${__dirname}/../client/favicon.ico`);
const clientJS = fs.readFileSync(`${__dirname}/../client/client.js`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// function to get css page
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

// function to get css page
const getFavicon = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/x-icon' });
  response.write(favicon);
  response.end();
};

const getClientJS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(clientJS);
  response.end();
};

module.exports = {
  getIndex,
  getCSS,
  getFavicon,
  getClientJS,
};
