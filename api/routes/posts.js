var express = require('express');
var db = require('../utils/db');
var router = express.Router();

/* GET posts listing. */
router.get('/', function(req, res, next) {
  db.query("SELECT * FROM js_wall_posts ORDER BY id DESC", function (err, result, fields) {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});


router.post('/', function(req, res, next) {

  var request = req.body;
  db.query("INSERT INTO js_wall_posts SET title='"+ request.title +"', description='"+ request.description +"', url='"+ request.url +"'", function (err, result, fields) {
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
