//include child routes
const Router            = require('koa-router');
const router            = new Router()
const postRoutes        = require('./post');
const categoryRoutes    = require('./category');
const commentRoutes     = require('./comment');

router.use('/post', postRoutes.routes(), postRoutes.allowedMethods());
router.use('/category', categoryRoutes.routes(), categoryRoutes.allowedMethods());
router.use('/comment', commentRoutes.routes(), commentRoutes.allowedMethods());


module.exports = router;