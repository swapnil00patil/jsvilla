
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "jsvilla",
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;
