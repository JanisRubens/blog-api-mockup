const Router                = require('koa-router');
const router                = new Router()
const CategoryColletion   = require('../../../models/categoryModel')

router.get('/', async (ctx, next) => {
  ctx.response.body = "Cats";
})

module.exports = router;