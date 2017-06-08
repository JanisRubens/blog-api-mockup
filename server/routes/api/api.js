const Router            = require('koa-router');
const router            = new Router()
const publicRotues      = require('./public/public');
const privateRoutes     = require('./private/private');
const { JWT_SECRET }    = require('../../../config');
const jwtMiddleWare     = require('koa-jwt');
const verifyAdminScope   = require('./../../middleware/verifyAdminScope'); //pass in the route to call it

router.use('/public',
            publicRotues.routes(),
            publicRotues.allowedMethods()
);

router.use('/private',
            jwtMiddleWare({ secret: JWT_SECRET, key: "jwtData" }),
            verifyAdminScope,
            privateRoutes.routes(),
            privateRoutes.allowedMethods()
);

module.exports = router;