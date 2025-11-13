/*
 * Title: Sample Route Handler
 * Description: Sample Hnandler for Demonstration
 * Author: Md. Saiful Islam
 * Date: 11/12/2025
 *
 */

// module scaffolding
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
    console.log(requestProperties);
    callback(200, {
        message: 'This is a sample route handler'
    });
};

module.exports = handler;