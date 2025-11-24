/*
 * Title: User Route Handler
 * Description: User Hnandler for Demonstration
 * Author: Md. Saiful Islam
 * Date: 11/19/2025
 *
 */

// Dependencies
const data = require('../../lib/data');
const { hash, parseJson } = require('../../helpers/utilities');
// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
 const acceptedMethods = ['get', 'post', 'put', 'delete'];
 if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._user[requestProperties.method](requestProperties, callback);
 } else {
     callback(405, {
         message: 'Method not allowed'
     });
 }
};


handler._user = {};

handler._user.post = (requestProperties, callback) => {
    console.log('request propersties value:',requestProperties);
    console.log('request propersties last name:',requestProperties.body.firstName);
    
   const firstName = typeof requestProperties.body.firstName === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false; 

    const lastName = typeof requestProperties.body.lastName === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;  

    const phone = typeof requestProperties.body.phone === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;  

    const password = typeof requestProperties.body.password === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;   

    const tosAggrement = typeof requestProperties.body.tosAggrement === 'boolean' ? requestProperties.body.tosAggrement : false;    

    if(firstName && lastName && phone && password && tosAggrement){
        // make sure that the user doesn't already exist
        data.read('users', phone, (err, user) => {
            if(err){
                let userObject = {
                    firstName, 
                    lastName,
                    phone,
                    password: hash(password),
                    tosAggrement
                }; 
                // store the user to database
                data.create('users', phone, userObject, (err2) => {
                    if(!err2){
                        callback(200, {
                            message: 'User created successfully'
                        });
                    } else {
                        callback(500, {
                            error: 'Could not create the new user'
                        });
                    }
                });
                    
            } else {
                callback(500, {
                    error: 'A user with that phone number already exists'
                })
            }
        });
    } else {
        callback(400, {
            error: 'You have a problem in your request'
        });
    }
} 

handler._user.get = (requestProperties, callback) => {
    // check the phone number is valid
    const phone = typeof requestProperties.queryStringObject.phone === 'string' && requestProperties.queryStringObject.phone.trim().length === 11 ? requestProperties.queryStringObject.phone : false;
    if(phone) {
        console.log("phone",phone);
        
        // lookup the user

        data.read('users', phone, (err, u) => {
            const user = { ...parseJson(u) };
            console.log("User", user);  
            if(!err && user) {
                delete user.password;
                callback(200, user); 
            } else {
                callback(404, {
                    error: 'User not found'
                });
            }
        });
     
    }
}
  
handler._user.put = (requestProperties, callback) => {

    // check the phone number if valid
    const phone =
        typeof requestProperties.body.phone === 'string' &&
        requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;

    const firstName =
        typeof requestProperties.body.firstName === 'string' &&
        requestProperties.body.firstName.trim().length > 0
            ? requestProperties.body.firstName
            : false;

    const lastName =
        typeof requestProperties.body.lastName === 'string' &&
        requestProperties.body.lastName.trim().length > 0
            ? requestProperties.body.lastName
            : false;

    const password =
        typeof requestProperties.body.password === 'string' &&
        requestProperties.body.password.trim().length > 0
            ? requestProperties.body.password
            : false;

     if(phone) {
        if (firstName || lastName || password) {
            // lookup the user
            data.read('users', phone, (err, uData) => {
                const userData = { ...parseJson(uData) };
                if(!err && userData) {
                    // update the fields
                    if(firstName) {
                        userData.firstName = firstName;
                    }
                    if(lastName) {
                        userData.lastName = lastName;
                    }
                    if(password) {
                        userData.password = hash(password);
                    }

                    // store the new updates
                    data.update('users', phone, userData, (err2) => {
                        if(!err2) {
                            callback(200, {
                                message: 'User updated successfully'
                            });
                        } else {
                            callback(500, {
                                error: 'There was a problem in the server side'
                            });
                        }
                    })  
                }  else {
                    callback(404, {
                        error: 'User not found!'
                    });
                } 
            }) 
        } else {
            callback(400, {
                error: 'You must provide at least one field to update!'
            })
        }
     } else {
        callback(400, {
            error: 'Invalid phone number. Please try again!'
        })
     }     
}

handler._user.delete = (requestProperties, callback) => {
    // check the phone number is valid
    const phone = typeof requestProperties.queryStringObject.phone === 'string' && requestProperties.queryStringObject.phone.trim().length === 11 ? requestProperties.queryStringObject.phone : false;
    if(phone) {
        // lookup the user
        data.read('users', phone, (err, uData) => {
            if(!err && uData) {
                data.delete('users', phone, (err2) => {
                    if(!err2) {
                        callback(200, {
                            message: 'User deleted successfully'
                        });
                    } else {
                        callback(500, {
                            error: 'Could not delete the user'
                        });
                    }
                });
            } else {
                callback(404, {
                    error: 'User not found'
                });
            }
        });
    } else{
        callback(400, {
            error: 'Invalid phone number. Please try again!'
        });
    }

}

module.exports = handler;  