/*
 * Title: Application Routes
 * Description: A RESTFul API to monitor up or down time of user defined links
 * Author: Md. Saiful Islam
 * Date: 11/12/2025
 *
 */
//Dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');
const { userHandler } = require('./handlers/routeHandlers/userHandler');

// module scaffolding
const routes = {
    sample: sampleHandler,
    user: userHandler
};

module.exports = routes;