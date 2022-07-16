<!--- The following README.md sample file was adapted from https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#file-readme-template-md by Gabriella Mosquera for academic use ---> 
<!--- You may delete any comments in this sample README.md file. If needing to use as a .txt file then simply delete all comments, edit as needed, and save as a README.txt file --->

# Assignment 3

**[Optional]** If what is being submitted is an individual Lab or Assignment. Otherwise, include a brief one paragraph description about the project.

* *Date Created*: 15 JUL 2022
* *Last Modification Date*: 15 JUL 2022
* *Lab URL*: <http://example.com/>
* *Git URL*: https://git.cs.dal.ca/jadav/5709_cardealerbackend_group9/-/tree/main/

## Authors

**[Optional]** If what is being submitted is an individual Lab or Assignment, you may simply include your name and email address. Otherwise list the members of your group.

* [Adarsh Kannan Iyengar] - *(Developer)*
* [Elizabeth James ] - *(Developer)*
* [Harsh Hariramani] - *(Developer)*
* [Krishna Sanjaybhai Jadav ] - *(Developer)*
* [Tuan Hamid] - *(Developer)*
* [Leah Isenor ] - *(Developer)*

## Built With

<!--- Provide a list of the frameworks used to build this application, your list should include the name of the framework used, the url where the framework is available for download and what the framework was used for, see the example below --->

* [Express](https://expressjs.com/) - The web framework for NodeJS
  **

## Sources Used

If in completing your lab / assignment / project you used any interpretation of someone else's code, then provide a list of where the code was implement, how it was implemented, why it was implemented, and how it was modified. See the sections below for more details.

### auth.config.ts

*Lines 3 - 5*

```
module.exports = {
    secret: "Cloud9"
};

```

The code above was created by adapting the code in [Bezkoder](https://www.bezkoder.com/node-js-mongodb-auth-jwt/) as shown below:

```
module.exports = {
  secret: "bezkoder-secret-key"
};

```

- <!---How---> The code in [Bezkoder](https://www.bezkoder.com/node-js-mongodb-auth-jwt/) was implemented by using it for jsonwebtoken
- <!---Why---> [NAME](link)'s Code was used because it is needed for Web token encoding
- <!---How---> [NAME](link)'s Code was modified by changing the secret

*Repeat as needed*

### user.controller.js

*Lines 10 - 26*

```
exports.register = (req, res) => {
    const user = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        isEnabled: true,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    user.save((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        res.status(201).send({message: 'User created'});
    });
};

```

The code above was created by adapting the code in [Bezkoder](https://www.bezkoder.com/node-js-mongodb-auth-jwt/) as shown below:

```
exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

```

- <!---How---> The code in [Bezkoder](https://www.bezkoder.com/node-js-mongodb-auth-jwt/) was implemented by using it for user registration
- <!---Why---> [Bezkoder](https://www.bezkoder.com/node-js-mongodb-auth-jwt/)'s Code was used because it shows an efficient way to create a registration
- <!---How---> [Bezkoder](https://www.bezkoder.com/node-js-mongodb-auth-jwt/)'s Code was modified by removing the unneccesary roles and replacing with a role variable and isEnabled variable for employee management

*Repeat as needed*

### user.controller.js

*Lines 29 - 66*

```
exports.login = (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            if (!user) {
                return res.status(404).send({message: "User not found"});
            }
            let isPasswordValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!isPasswordValid) {
                return res.status(401).send({
                    message: "Invalid Password!"
                });
            }
            if (user.isEnabled === false) {
                return res.status(401).send({
                    message: "Account disabled!"
                });
            }
            let token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 86400
            });

            res.status(200).send({
                id: user._id,
                username: user.username,
                role: user.role,
                accessToken: token
            });
        });
};

```

The code above was created by adapting the code in [Bezkoder](https://www.bezkoder.com/node-js-mongodb-auth-jwt/) as shown below:

```
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};


```

- <!---How---> The code in [Bezkoder](https://www.bezkoder.com/node-js-mongodb-auth-jwt/) was implemented by using it for user login
- <!---Why---> [Bezkoder](https://www.bezkoder.com/node-js-mongodb-auth-jwt/)'s Code was used because it shows an efficient way for user login
- <!---How---> [Bezkoder](https://www.bezkoder.com/node-js-mongodb-auth-jwt/)'s Code was modified by adding features for user role and and isEnabled checks

*Repeat as needed*

### user.controller.js


*Lines 128 - 136*
*Lines 160 - 171*

```
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: 'sl.rahmanhamid@gmail.com',
            pass: 
        },
        secure: true,
    });
		const mailData = {
                    from: 'tn220771@dal.ca',
                    to: user.username,
                    subject: 'New Password',
                    text: 'Your new password is ' + newPassword
                };
                transporter.sendMail(mailData, function (err, data) {
                    if(err)
                        console.log(err)
                    else
                        res.status(200).send({message: 'Password reset mail sent'});
                });

```

The code above was created by adapting the code in [Sudhanshu Sharma](https://medium.com/coox-tech/send-mail-using-node-js-express-js-with-nodemailer-93f4d62c83ee) as shown below:

```
const transporter = nodemailer.createTransport({
port: 465,               // true for 465, false for other ports
host: "smtp.gmail.com",
   auth: {
        user: 'youremail@gmail.com',
        pass: 'password',
     },
secure: true,
});
const mailData = {
from: 'youremail@gmail.com',  // sender address
  to: 'myfriend@gmail.com',   // list of receivers
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
  html: '<b>Hey there! </b>
         <br> This is our first message sent with Nodemailer<br/>',
};
transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
});


```

- <!---How---> The code in [Sudhanshu Sharma](https://medium.com/coox-tech/send-mail-using-node-js-express-js-with-nodemailer-93f4d62c83ee) was implemented by using it for user password reset
- <!---Why---> [Sudhanshu Sharma](https://medium.com/coox-tech/send-mail-using-node-js-express-js-with-nodemailer-93f4d62c83ee)'s Code was used because it shows how send free emails using gmail
- <!---How---> [Sudhanshu Sharma](https://medium.com/coox-tech/send-mail-using-node-js-express-js-with-nodemailer-93f4d62c83ee)'s Code was modified by adding features to reset password and sending the new password

*Repeat as needed*

### user.controller.js


*Lines 151*

```
let newPassword = (Math.random() + 1).toString(36).substring(7);

```

The code above was created by adapting the code in [StackOverflow](https://stackoverflow.com/a/8084248) as shown below:

```
let r = (Math.random() + 1).toString(36).substring(7);
console.log("random", r);

```

- <!---How---> The code in [StackOverflow](https://stackoverflow.com/a/8084248) was implemented by using it for user password generation
- <!---Why---> [StackOverflow](https://stackoverflow.com/a/8084248)'s Code was used because it generates random strings
- <!---How---> [StackOverflow](https://stackoverflow.com/a/8084248)'s Code was modified by encoding the string and saving it for a users password

*Repeat as needed*

### authorization.js


*Lines 8-20*

```
verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

```

The code above was created by adapting the code in [Bezkoder](https://www.bezkoder.com/node-js-mongodb-auth-jwt/) as shown below:

```
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};


```

- <!---How---> The code in [Bezkoder](https://www.bezkoder.com/node-js-mongodb-auth-jwt/) was implemented by using it for user token
- <!---Why---> [Bezkoder](https://www.bezkoder.com/node-js-mongodb-auth-jwt/)'s Code was used because it verifies user tokens
- <!---How---> [Bezkoder](https://www.bezkoder.com/node-js-mongodb-auth-jwt/)'s Code was modified by using it for token checking

*Repeat as needed*

### authorization.js


*Lines 22-36*

```
checkUserDuplicate = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(409).send({ message: "User already exists!" });
            return;
        }
        next();
    });
};

```

The code above was created by adapting the code in [Bezkoder](https://www.bezkoder.com/node-js-mongodb-auth-jwt/) as shown below:

```
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }
      next();
    });
  });
};



```

- <!---How---> The code in [Bezkoder](https://www.bezkoder.com/node-js-mongodb-auth-jwt/) was implemented by using it for checking email duplication
- <!---Why---> [Bezkoder](https://www.bezkoder.com/node-js-mongodb-auth-jwt/)'s Code was used because it verifies duplication in fields
- <!---How---> [Bezkoder](https://www.bezkoder.com/node-js-mongodb-auth-jwt/)'s Code was modified by using it for only user email checking with status code 409

*Repeat as needed*

### user.route.js


*Lines 5-20*

```
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/user/register", [authorization.checkUserDuplicate] ,controller.register
    );
    app.post("/api/user/login", controller.login);
    app.put("/api/user/updatepassword", controller.updatePassword);
    app.put("/api/user/updatestatus", controller.updateStatus);
    app.get("/api/user/employees", controller.findAllEmployees);
    app.post("/api/user/resetpassword", controller.resetPasswordByEmail);

};
```

The code above was created by adapting the code in [Bezkoder](https://www.bezkoder.com/node-js-mongodb-auth-jwt/) as shown below:

```
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  app.post("/api/auth/signin", controller.signin);
};


```

- <!---How---> The code in [Bezkoder](https://www.bezkoder.com/node-js-mongodb-auth-jwt/) was implemented by using it for routing
- <!---Why---> [Bezkoder](https://www.bezkoder.com/node-js-mongodb-auth-jwt/)'s Code was used because it shows routing with middleware usage
- <!---How---> [Bezkoder](https://www.bezkoder.com/node-js-mongodb-auth-jwt/)'s Code was modified by using custom routes and only needed middleware functions

*Repeat as needed*

### models/index.js


*Lines 2-6*

```
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
```

The code above was created by adapting the code in [Bezkoder](https://www.bezkoder.com/node-js-mongodb-auth-jwt/) as shown below:

```
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.role = require("./role.model");
db.ROLES = ["user", "admin", "moderator"];
module.exports = db;



Feature 1: get rental rates for user inputted start and end dates of the rental period, kilometers driven on an average per day and seat count of the vehicles
Feature 2: get cars available for loan, if the car is under insurance
Author: Elizabeth James

backend files:
Model: api/models/rentals/rentalfactor.model.js and api/models/rentals/rentalrate.model.js
Routes: api/route/rentalroute.js
controller: api/controller/rental.controller.js

have also included a apis in controller/inventory.controller.js - getFilteredResultsForRent()

frontend files:
All 7 files under src/pages/quotes

Other sources:
convert Date to string in YYYY-MM-DD:
https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
Author: Darth Egregious
used at line #75 of rental.controller.js

Circular progress bar:
https://mui.com/material-ui/react-progress/ - circular 
used at line #45 of CarMoreDeals.js
```

### controllers/vehicles.controller.js

The code for vehicles controller was referenced from: https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/ and modified according to the requirements.

-----------------------
*Repeat as needed*

### File Name

*Lines ## - ##*

```
Copy and paste your code on lines mentioned 

```

The code above was created by adapting the code in [NAME](link) as shown below:

```
Copy and paste the snippet of code you are referencing

```

- <!---How---> The code in [NAME](link) was implemented by...
- <!---Why---> [NAME](link)'s Code was used because...
- <!---How---> [NAME](link)'s Code was modified by...

*Repeat as needed*

## Acknowledgments

*https://www.npmjs.com/package/bcryptjs
*https://www.npmjs.com/package/mongoose
*https://www.npmjs.com/package/nodemailer
*https://mail.google.com/mail/
