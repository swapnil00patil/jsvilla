var express = require('express');
var db = require('../utils/db');
var router = express.Router();

router.post('/save', function (req, res, next) {
  let request = req.body;
  request = {
    author_id: db.escape(request.author_id),
    posted_date: db.escape(request.posted_date),
    title: db.escape(request.title),
    unique_value: db.escape(request.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, "").toLowerCase()),
    description: db.escape(request.description),
    url: db.escape(request.url),
    image_url: db.escape(request.image_url) || '',
    demo_url: db.escape(request.demo_url) || ''
  }
  db.query("INSERT INTO js_wall_posts SET unique_value=" + request.unique_value + ", author_id=" + request.author_id + ", posted_date=" + request.posted_date + ", title=" + request.title + ", description=" + request.description + ", url=" + request.url + ", image_url=" + request.image_url + ", demo_url=" + request.demo_url + "", function (err, result, fields) {
    if (err) throw err;
    var postId = result.insertId;
    var tags = request.tags;
    if (Array.isArray(tags) && tags.length > 0 && postId) {
      tags.forEach((tag) => {
        db.query("INSERT INTO js_post_tags SET post_id='" + postId + "', tag_id='" + tag.id + "'", function (err, result, fields) {
        });
      })
    }

    res.send(JSON.stringify(postId));
  });
});

/* GET posts listing. */
router.post('', function (req, res, next) {
  let request = req.body;
  var offset = (request.offset) || 0
  switch (request.type) {
    case 'tag':
      db.query("SELECT * FROM js_tags WHERE unique_value='" + request.unique + "'", function (err, tags_result, tags_fields) {
        if (err) throw err;
        var tagsIn = tags_result.map(function (elem) {
          return elem.id;
        }).join(",");
        db.query("SELECT * FROM js_wall_posts as jw, js_post_tags as jpt WHERE jpt.tag_id in (" + tagsIn + ") and jw.id = jpt.post_id ORDER BY jw.id DESC LIMIT 3 OFFSET " + offset, function (err, result, fields) {
          if (err) throw err;
          res.send(JSON.stringify(result));
        });
      });
      break
    case 'author':
      db.query("SELECT * FROM js_authors WHERE unique_value='" + request.unique + "'", function (err, authors_result, authors_fields) {
        if (err) throw err;
        var authorsIn = authors_result.map(function (elem) {
          return elem.id;
        }).join(",");
        db.query("SELECT * FROM js_wall_posts WHERE author_id in (" + authorsIn + ") ORDER BY id DESC LIMIT 3 OFFSET " + offset, function (err, result, fields) {
          if (err) throw err;
          res.send(JSON.stringify(result));
        });
      });
      break
    default:
      db.query("SELECT * FROM js_wall_posts ORDER BY id DESC LIMIT 3 OFFSET " + offset, function (err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result));
      });
  }
});

module.exports = router;
