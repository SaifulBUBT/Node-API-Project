/*
 * Title: Handle Request and Response
 * Description: A RESTFul API to monitor up or down time of user defined links
 * Author: Md. Saiful Islam
 * Date: 11/12/2025
 *
 */

// Dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');

// module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
       // Request handling
    // Get the url and parse it
    const parsedUrl = url.parse(req.url, true);
    console.log(parsedUrl);
    const path = parsedUrl.pathname;
    console.log('Path'+path);
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    console.log('Trimmed path: '+ trimmedPath);
    
    const method = req.method.toLowerCase();
    console.log('Method '+method);
    
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;
    
    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject
    }

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;
    chosenHandler(requestProperties, (statusCode, payload) => {
        statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
        payload = typeof(payload) === 'object' ? payload : {};
        const payloadString = JSON.stringify(payload);

        // Return the final response
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end(payloadString);
    });   
    
    const decoder = new StringDecoder('utf-8');
    let realData = '';

    req.on('data', (buffer) => {
        realData += decoder.write(buffer)
    })

    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);

        // Response handling
        res.end(realData);
    })

}

module.exports = handler;