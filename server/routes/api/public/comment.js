const Router                = require('koa-router');
const router                = new Router()
const CommentColletion      = require('../../../models/commentModel')

router.get('/', async (ctx, next) => {
  const comments = await CommentColletion.find({})
  ctx.response.body = await comments;
})

module.exports = router;