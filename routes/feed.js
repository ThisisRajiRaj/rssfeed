var express = require('express');
var BlogFeed = require('../components/BlogFeed');

var router = express.Router();

let cache = {
  blogFeed: new BlogFeed(),
  timeCached: 0
}
/* GET feed listing. */
router.get('/', async function(req, res, next) {
  let flushCache = req.body.flushCache;
  if (!req.body.flushCache) {
      var threeHours = 3 * 120000; // 120000 being the number of milliseconds in an hour
      var now = new Date();
      var threeHoursAgo = new Date(now - threeHours);
      flushCache = cache.timeCached < threeHoursAgo;
  }
  if (flushCache) {
      cache.blogFeed = new BlogFeed()
      await cache.blogFeed.readIndex();
      cache.timeCached = Date.now()
  }

  res.status(200).send(cache.blogFeed.getRss2Feed());
});

module.exports = router;
