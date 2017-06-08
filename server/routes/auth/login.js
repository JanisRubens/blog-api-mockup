const Router            = require('koa-router');
const router            = new Router();
const User              = require('../../models/userModel')
const { JWT_SECRET }    = require('../../../config')
const jwt               = require('jsonwebtoken')

router.post('/', async (ctx, next) => {
  const response = await User.verifyIdentity({ email: ctx.request.body.email, password: ctx.request.body.password })
  if (!response.err) {
    ctx.response.body = {
      err: response.err,
      token: jwt.sign({id: response.user.id, scope: response.user.scope }, JWT_SECRET),
      user: {id: response.user.id, firstName: response.user.firstName, lastName: response.user.lastName, email: response.user.email},
      message: "You have successfuly logged in!"
    }
  } else {
    ctx.response.status = response.status
    ctx.response.body = response
  }
})


module.exports = router;