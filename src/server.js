const http = require('http');

const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');



const port = process.env.PORT || process.env.NODE_PORT || 3000;

//favicon add later
const urlStruct = {
    '/': htmlHandler.getIndex,
    '/favicon.ico':htmlHandler.getFavicon,
    '/style.css': htmlHandler.getCSS,
    '/client.js': htmlHandler.getClientJS,
};

//handles the http request from our server
const onRequest = (request, response) => {

    const parsedUrl = url.parse(request.url);
    const params = query.parse(parsedUrl.query);

    const acceptedTypes = request.headers.accept.split(',');

    //runs request based off the url struct
    if (urlStruct[parsedUrl.pathname]) {
        urlStruct[parsedUrl.pathname](request, response, acceptedTypes, params);
    } else {
        urlStruct.notFound(request, response, acceptedTypes, params);
    }
};

//starts the server and then logs when our server is listening for request
http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
});