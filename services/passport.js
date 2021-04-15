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
  async (accessToken, refreshToken, profile, done) => {
     
    // Async action - does not return user directly, returns a promise
    const existingUser = await User.findOne({ googleID : profile.id })
    
            if(existingUser){
                // we already have a record with given profile ID - do not create new record
                return done(null, existingUser);
            } 
                // record not found - Then create new record
                // creating a new intance of a user   
                const user = await new User({ googleID: profile.id }).save()
                // callback returns a model instance - user provided inside of promise callback
                 done(null, user);
            
    }
  )
);



