require('babel-core/register');
// require the rest of the app that needs to be transpiled after the hook
const app = require('./server/server');

module.exports = app.listen() //For testing 