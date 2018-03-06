const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dbConfig = require('../config/database');
// We want to export the router api

module.exports = (router) => {
  // Our get request to check if the email that was entered on the front end is already in use.
  router.get('/checkEmail/:email', (request,response) => {
    User.findOne({ email: request.params.email }, (err,email) => {
      if (err) {
        // Connection error was found
        response.json({success: false, message: err});
      }
      else {
        if (email) {
          response.json({success: false, message: "Email already in system."});
        }
        else {
          response.json({success: true, message: "Email is okay to use."});
        }
      }
    });
  });
  // Our post request to register a user, will send a JSON object containing
  // request.body.user, request.body.email, request.body.password
  router.post('/register', (request, response) =>{
    if (!request.body.email) {
      response.json({success: false, message: 'Email error'});
    }
    else if (!request.body.password) {
      response.json({success: false, message: 'Password error'});
    }
    else{
      let user = new User({
        first: request.body.firstName,
        last: request.body.lastName,
        email: request.body.email,
        phone: request.body.phoneNumber,
        department: request.body.department,
        building: request.body.building,
        room: request.body.room,
        password: request.body.password,
        privilege: request.body.role,
        approved: false
      });
      user.save((error) =>{
        if (error) {
          if (error.code === 11000) {
            console.log(error);
            response.json({success: false, message: 'Username or email already exists.'});
          }
          else{
            if (error.errors.email) {
              response.json({success: false, message: error.errors.email.message});
            }
            else if (error.errors.password) {
              response.json({success: false, message: error.errors.password.message});
            }
            else {
              console.log(error);
              response.json({success: false, message: 'User could not be saved.'});
            }
          }
        }
        else{
          response.json({success: true, message: 'User was saved!'});
        }
      });
    }
  });
  // Our post request to log into the app
  router.post('/login', (request,response) => {
    console.log("Login request\n" + request);
    User.findOne({email: request.body.email.toLowerCase()}, (err, user) => {
      if (err) {
        response.json({ success: false, message: err });
      }
      else {
        if (!user) {
          response.json({ success: false, message: "Email was not found. Try another?" });
        }
        else{
          if (!user.approved) {
            response.json({ success: false, message: "Your account has not been approved by EHOS. A confirmation email will be sent to you by someone at the EHOS department upon approval." });
          }
          else {
            // Now lets check for the password to be right
            if (!user.checkPassword(request.body.password)) {
              response.json({ success: false, message: "Incorrect password!"});
            }
            else {
              // We can start our client session
              const session = jwt.sign({ userId: user._id }, dbConfig.secret, { expiresIn: '24h' });
              response.json({ success: true, message: "Works!", token:session, expires: 86400, privilege: user.privilege});
            }
          }
        }
      }
    });
  });
  // Our middleware is in effect now...
  // Middleware
        // Middleware to intercept any HTTP request on the ehos api endpoint with a header that has a name of authorization
        router.use('/ehos',(request, response, next) => {
          const token = request.headers['authorization'];
          if (!token) {
            response.status(403).json({success: false, message: "Token was not provided"});
          }
          else {      
            jwt.verify(token,dbConfig.secret, (err, valid) =>{
              console.log(valid);

              if (err) {
                response.status(403).json({success: false, message: "Token error: " + err});
              }
              else {
                // Token is valud and passed
                request.decoded = valid;
                next();
              }
            });
          }
        });
  
  return router;
}
