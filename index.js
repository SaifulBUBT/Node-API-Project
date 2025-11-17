/*
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down time of user defined links
 * Author: Md. Saiful Islam
 * Date: 11/12/2025
 *
 */

// Dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');

const environment = require('./helpers/environments');

const data = require('./lib/data');

// App object - module scaffolding
const app = {};

// Configuration
// app.config = {
//   port: 3000,
// };


// data.create('testDir', 'testFile', { country: 'Bangladesh', language: 'Bangla' }, (err) => {
//     console.log('This was the error: ', err);
// });

// data.create('users', 'user1', { name: 'John Doe', age: 30 }, (err) => {
//     console.log('This was the error: ', err);
// });

// data.read('users', 'user1', (err, data) => {
//     console.log('Data read from file: ', err, data); 
// });

// data.update('users', 'user1', {'name': 'Alex', 'age': 24}, (err) => {
//     console.log('This was the error: ', err);
// })

// data.delete('testDir', 'testFile', (err) => {
//     console.log(err);
    
// })

// Create Server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        // console.log(`Environment variable is: ${process.env.NODE_ENV}`);
        // console.log(`Type: ${typeof(process.env.NODE_ENV)}`);
        // console.log('Obejct', environment);
        
        
        console.log(`Server is listening on port ${environment.port}`);
    })
}

// Handle Request Response
app.handleReqRes = handleReqRes;

// Start the server
app.createServer();