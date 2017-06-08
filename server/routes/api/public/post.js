const Router            = require('koa-router');
const router            = new Router()
const Post              = require('../../../models/postModel')
const Comment           = require('../../../models/commentModel')

router.get('/', async (ctx, next) => {
  ctx.response.body = await Post.getAll()
})

router.get('/:startIndex/:count', async (ctx, next) => {
  ctx.response.body =  await Post.getBulk(ctx.params.startIndex,ctx.params.count)
})

router.get('/:postID', async (ctx, next) => {
  const post = await Post.getOne(ctx.params.postID)
  const comments = await Comment.getAllByPostID(post._id)
  if (post) {
      const body = await Object.assign({}, post, {comments: comments})
      ctx.response.body = body;
  }
})

module.exports = router;