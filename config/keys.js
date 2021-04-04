/* keys.js - figure out which credentials to return - How?
Houses Logic that will figure out if we are in a production or development environment
When we deploy server to heroku there is an existing environment variable (node_env) that 
tells us when we are running in production 
*/

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');

} else {
    // local machine - dev keys
    module.exports = require('./dev');
}

