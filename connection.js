const mysql = require("mysql")
const con = mysql.createConnection({

    host: "sql6.freesqldatabase.com" ,    //"localhost"
    user: "sql6632500",  //"root",
    password: "AL7HaVYzQk",  //"",
    database: "sql6632500",
    port: 3306 //3308
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connection created..!!");
});

module.exports.con = con;