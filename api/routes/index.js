var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
