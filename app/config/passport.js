const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrpyt = require("bcrypt");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(function (username, password, done) {
      User.findOne({ username: username }, async function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { msg: "User Not Found!!" });
        }
        try {
          if (await bcrpyt.compare(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false, { msg: "Password incorrect!!" });
          }
        } catch (error) {
          console.log(error);
        }
      })
    })
  )
  passport.serializeUser((user, done)=>{
    done(null, user.id);
  });

  passport.deserializeUser((id, done)=> {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


};
