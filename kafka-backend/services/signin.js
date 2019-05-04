var bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
var userModel = require("../model/UserSchema.js");
// var { client } = require('../resources/redis');


async function handle_request_signup(msg, callback) {
  try {
    let { email, password, firstName, lastName } = msg;
    email = email.toLowerCase();
    let responseOne = await userModel.findOne({ email });
    if (responseOne) {
      var body = {
        message: "Signup failed! Email already exists",
        insertStatus: 0
      };
      callback(null, body)
    } else {
      let hash = await bcrypt.hash(password, saltRounds);
      var user = new userModel({ email, password: hash, firstName, lastName });
      let response = await user.save();
      var body = {
        id: response._id,
        message: "Sign up successfull. Redirecting to Login Page...",
        insertStatus: 1
      };
      callback(null, body)
    }
  } catch (error) {
    callback(error, null);
  }
}
async function handle_request_signin(msg, callback) {
  var body = "";
  // client.get('loginQueryKey', async function (err, query_results) {
  //   if (query_results) {
  //     body = query_results;
  //     callback(null, JSON.parse(body));
  //   }
  //   else {

      let req = {
        body: msg
      }
      let loginSuccess = 0;
      try {
        let { email, password } = msg;
        console.log("email==========>")
        console.log(email);
        email = email.toLowerCase();
        let result = await userModel.findOne({ email });
        let data = null;
        if (!result) {
          data = {
            loginSuccess: 0,
            message: "Email or Password Incorrect"
          };
        } else {
          const match = await bcrypt.compare(password, result.password);
          if (match) {
            var user = {
              email: result.email
            };
            var token = jwt.sign(user, "There is no substitute for hardwork", {
              expiresIn: 10080 // in seconds
            });
            data = {
              id: result._id,
              role: result.role,
              loginSuccess: 1,
              message: "Login Successfull!",
              token: 'JWT ' + token,
              email:result.email
            };
          } else {
            data = {
              loginSuccess: 0,
              message: "Email or Password Incorrect"
            };
          }
        }
      //  client.set('loginQueryKey', JSON.stringify(data));
        callback(null, data)
      } catch (error) {
        callback(error, null);
      }

   // }
//  });
}

module.exports = {
  signin: { handle_request: handle_request_signin },
  signup: { handle_request: handle_request_signup }
};