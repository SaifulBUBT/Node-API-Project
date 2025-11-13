/*
 * Title: Application Routes
 * Description: A RESTFul API to monitor up or down time of user defined links
 * Author: Md. Saiful Islam
 * Date: 11/12/2025
 *
 */
//Dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');

// module scaffolding
const routes = {
    sample: sampleHandler
};

module.exports = routes;