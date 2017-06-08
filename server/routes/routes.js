//include child routes
const Router            = require('koa-router');
const router            = new Router()
const apiRoutes         = require('./api/api');
const authRoutes        = require('./auth/auth');

router.use('/api', apiRoutes.routes(), apiRoutes.allowedMethods());
router.use('/auth', authRoutes.routes(), authRoutes.allowedMethods());


module.exports = router