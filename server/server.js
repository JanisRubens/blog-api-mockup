
const logger            = require('koa-logger')
const Koa               = require('koa');
const PORT              = 3001
//const bodyParser        = require('koa-bodyparser'); // will be ok once node 7 is stable
const bodyParser        = require('koa-body-parser'); //will be depracated
const Helmet            = require('koa-helmet');
const cors              = require('koa-cors');
const app               = new Koa();
const mongoose          = require('mongoose');
const initializeDB      = require('./models');
const routes            = require('./routes/routes');

//DB
initializeDB( 'mongodb://janis:admin@ds159377.mlab.com:59377/sandbox' , mongoose)

//middleware
app.use(bodyParser())

//Sets Security HTTP Headers
app.use(cors({origin:'http://localhost:3000'})) //needs to be before helmet
app.use(Helmet())
app.use(logger())

//route middleware
app.use(function(ctx, next){
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = err.status;
      ctx.body = err.message || 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  });
});


//routes
app.use(routes.routes());

app.listen(PORT);

module.exports = app
