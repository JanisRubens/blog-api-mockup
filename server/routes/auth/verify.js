const Router            = require('koa-router');
const router            = new Router();
const User              = require('../../models/userModel')
const { JWT_SECRET }    = require('../../../config')
const jwtMiddleWare     = require('koa-jwt');
const verifyAdminScope  = require('./../../middleware/verifyAdminScope'); //pass in the route to call it

router.get('/', jwtMiddleWare({ secret: JWT_SECRET, key: "jwtData" }), async (ctx, next) => {

    const userDetails = await User.getOne(ctx.state.jwtData.id)
    ctx.response.body = userDetails
})


module.exports = router;