const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// used to generate token that will be set on cookie - user = info pulled out of database
passport.serializeUser((user, done) => {
    // callback (error,user identification) - id added to record by mongo - not google ID
    done(null, user.id);
})

// Taking id from cookie and creating a user model
passport.deserializeUser((id, done) => {
    // search db for a particular user + call done w/ user
    User.findById(id)
        .then(user => {
            done(null, user)
        })
})

passport.use(
    new GoogleStrategy(
    {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true        
  }, 
  (accessToken, refreshToken, profile, done) => {
     
    // Async action - does not return user directly, returns a promise
    User.findOne({ googleID : profile.id })
        .then(existingUser => {
            if(existingUser){
                // we already have a record with given profile ID - do not create new record
                done(null, existingUser);
            } else {
                // record not found - Then create new record
                // creating a new intance of a user   
                new User({ googleID: profile.id })
                // save() adds instance to db
                .save()
                // callback returns a model instance - user provided inside of promise callback
                .then(user => done(null, user));
            }
        });
    }
  )
);



