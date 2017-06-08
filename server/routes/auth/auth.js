const Router            = require('koa-router');
const router            = new Router()
const loginRoute        = require('./login');
const registerRoute     = require('./register');
const verifyRoute       = require('./verify');

router.use('/login', loginRoute.routes(), loginRoute.allowedMethods());
router.use('/register', registerRoute.routes(), registerRoute.allowedMethods());
router.use('/verify', verifyRoute.routes(), verifyRoute.allowedMethods());

module.exports = router;