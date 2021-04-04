const passport = require('passport')

module.exports = (app) => {
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
        scope: ['profile', 'email']
    }))
    
    app.get('/auth/google/callback', 
    passport.authenticate('google'));

    app.get('/api/logout', (req,res) => {
        // provided by passport - kills cookie associated with user
        req.logout();
        // after logging out req.user is deleted
        res.send(req.user);
    } )

    // Testing Authentication
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })
};



