/*
 * Title: Utilities
 * Description: utility funstions
 * Author: Md. Saiful Islam
 * Date: 11/12/2025
 *
 */

// Dependencies
const crypto = require('crypto');

// module scaffolding
const utilities = {};

// parse json string to object 
utilities.parseJson = (jsonString) => {
    let output;
    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }

    return output;
}

// hash string
utilities.hash = (str) => {
    if (typeof(str) === 'string' && str.length > 0) {
        const hash = crypto.createHmac('sha256', 'asdfljheunxhjdhgur23y4u5t6y7u8i9o0p') // secret key
            .update(str)
            .digest('hex');
        return hash;
    }
    return false;
}

// Export the module
module.exports = utilities;