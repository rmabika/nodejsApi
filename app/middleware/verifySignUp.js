const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;



checkUserInputs = (req, res, next) => {

  try {

    if(!req.body.fullName){
      res.status(400).send({
        status: 400,
        message: "Failed! Please type the fullname!"
      });
     return;
    }else if(!req.body.email){
      res.status(400).send({
        status:400,
        message: "Failed! Please type the email address"
      })
      return
    }else if(!req.body.password){
      res.status(400).send({
        status:400,
        message: "Failed! Please type the password"
      })
      return
    }





  } catch(err){
    res.json({ message : err});
  }
  next();
};

checkDuplicateUsernameOrEmail = (req, res, next) => {

  // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(403).send({
          status: 403,
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          status:400,
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkUserInputs:checkUserInputs,
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
