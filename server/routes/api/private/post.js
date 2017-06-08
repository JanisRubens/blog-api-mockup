const Router            = require('koa-router');
const router            = new Router()
const Post              = require('../../../models/postModel')

router.post('/', async (ctx, next) => {
    ctx.response.body = await Post.saveOne( ctx.request.body );
})

router.put('/', async (ctx, next) => {
    ctx.response.body = await Post.updateOne( ctx.request.body )
})

router.delete('/', async (ctx, next) => {
    ctx.response.body = await Post.deleteOne( ctx.request.body._id )
})

module.exports = router;