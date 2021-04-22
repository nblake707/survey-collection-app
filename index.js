const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
// needs to come before the next require so that it can be used
require('./models/User');
require('./services/passport');


 mongoose.connect(keys.mongoURI , { useUnifiedTopology: true,  useNewUrlParser: true });
  

const app = express();

// lets express know that we want to use cookies - middleware - small functions that can be used to modify incoming requests before they are sent to route handlers
app.use(
    cookieSession({
        //config object
        maxAge: 30 * 24 * 60 * 60 * 1000,    // how long the cookie can live within the browser
        keys: [keys.cookieKey]               // used to encrypt the cookie
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

// Dynamic Port Binding - Heroku tells us which port our app will use
const PORT = process.env.PORT || 5000;
app.listen(PORT); 