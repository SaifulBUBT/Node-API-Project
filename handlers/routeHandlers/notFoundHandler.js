/*
 * Title: Not found Handler
 * Description: Not found Hnandler for Demonstration
 * Author: Md. Saiful Islam
 * Date: 11/12/2025
 *
 */

// module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
    console.log(requestProperties);
    callback(404, {
        message: 'Your requested URL was not found'
    })
};

module.exports = handler;