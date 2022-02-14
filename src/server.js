const http = require('http');

const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

//handle POST requests
const handlePost = (request, response, parsedUrl) => {

    //If they go to /addUser
    if (parsedUrl.pathname === '/addUser') {

        //Call our below parseBody handler, and in turn pass in the
        //jsonHandler.addUser function as the handler callback function.
        parseBody(request, response, jsonHandler.addUser);
    }
};

const parseBody = (request, response, handler) => {

    //The request will come in in pieces. We will store those pieces in this
    //body array.
    const body = [];

    //if we experience an error w/ requests
    request.on('error', (err) => {
        console.dir(err);
        response.statusCode = 400;
        response.end();
    });

    //The second possible event is the "data" event. This gets fired when we
    //get a piece (or "chunk") of the body. Each time we do, we will put it in
    //the array. We will always recieve these chunks in the correct order.
    request.on('data', (chunk) => {
        body.push(chunk);
    });

    //when our request ends
    request.on('end', () => {
        const bodyString = Buffer.concat(body).toString();
        const bodyParams = query.parse(bodyString);

        //Once we have the bodyParams object, we will call the handler function. We then
        //proceed much like we would with a GET request.
        handler(request, response, bodyParams);
    });
};


const urlStruct = {
    '/': htmlHandler.getIndex,
    '/favicon.ico': htmlHandler.getFavicon,
    '/style.css': htmlHandler.getCSS,
    '/client.js': htmlHandler.getClientJS,
    '/getUsers':jsonHandler.getUsers,
};

//handle GET requests
const handleGet = (request, response, parsedUrl) => {

    //runs request based off the url struct
    if (urlStruct[parsedUrl.pathname]) {
        urlStruct[parsedUrl.pathname](request, response);
    }

    // if (parsedUrl.pathname === '/style.css') {
    //     htmlHandler.getCSS(request, response);
    // } else if (parsedUrl.pathname === '/getUsers') {
    //     jsonHandler.getUsers(request, response);
    // } else {
    //     htmlHandler.getIndex(request, response);
    // }
}

//handles the http request from our server

const onRequest = (request, response) => {
    //parse url into individual parts
    //returns an object of url parts by name
    const parsedUrl = url.parse(request.url);

    //const params = query.parse(parsedUrl.query);

    //const acceptedTypes = request.headers.accept.split(',');
    //check if method was POST, otherwise assume GET 
    //for the sake of this example
    if (request.method === 'POST') {
        handlePost(request, response, parsedUrl);
    } else {
        handleGet(request, response, parsedUrl);
    }
};

//starts the server and then logs when our server is listening for request
http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
});