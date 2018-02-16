var mysql = require('mysql');
var connection  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'root',
  database        : 'jsvilla',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
  multipleStatements: true
});

module.exports = connection;