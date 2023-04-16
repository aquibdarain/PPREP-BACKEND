const mysql = require('mysql2')

var connection = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10, 
}) 

connection.connect(function(err) {  
  if (err) throw err;  
  console.log("Connected!");  
});  

module.exports = connection;