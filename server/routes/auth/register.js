const Router            = require('koa-router');
const router            = new Router();
const User              = require('../../models/userModel')
const { JWT_SECRET }    = require('../../../config')
const jwt               = require('jsonwebtoken')

router.post('/', async (ctx, next) => {
  const response = await User.createOne(ctx.request.body.userData)
  if (!response.err) {
      ctx.response.body = {
          token: jwt.sign(response.user, JWT_SECRET),
          message: "You have successfuly logged in!"
        }
  } else {
    ctx.response.body = response 
  }
})


module.exports = router;