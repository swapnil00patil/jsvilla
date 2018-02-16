var express = require('express');
var db = require('../utils/db');
var router = express.Router();

/* GET posts listing. */
router.get('/:offset', function(req, res, next) {
  var offset = (req.params && req.params.offset) || 0
  db.query("SELECT * FROM js_wall_posts ORDER BY id DESC LIMIT 20 OFFSET " + offset, function (err, result, fields) {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});


router.post('/', function(req, res, next) {
  let request = req.body;
  request = {
    author_id: db.escape(request.author_id),
    posted_date: db.escape(request.posted_date),
    title: db.escape(request.title),
    post_unique_url: db.escape(request.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, "").toLowerCase()),
    description: db.escape(request.description),
    url: db.escape(request.url),
    image_url: db.escape(request.image_url) || '',
    demo_url: db.escape(request.demo_url) || ''
  }
  db.query("INSERT INTO js_wall_posts SET post_unique_url="+ request.post_unique_url +", author_id="+ request.author_id +", posted_date="+ request.posted_date +", title="+ request.title +", description="+ request.description +", url="+ request.url +", image_url="+ request.image_url +", demo_url="+ request.demo_url +"", function (err, result, fields) {
    if (err) throw err;
    var postId = result.insertId;
    var tags = request.tags;
    if(Array.isArray(tags) && tags.length > 0 && postId) {
      tags.forEach((tag) => {
        db.query("INSERT INTO js_post_tags SET post_id='"+ postId +"', tag_id='"+ tag.id +"'", function (err, result, fields) {
        });
      })
    }
    
    res.send(JSON.stringify(postId));
  });
});
module.exports = router;
