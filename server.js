const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {res.send("Hello World!!")})

// MYSQL

var dbName = 'node_db';
var userTable = 'user';

var createDatabase = mysql.createConnection({
    host        :   'localhost',
    user        :   'root',
    password    :   ''
});

createDatabase.connect((error) => {
    if(error){throw error}
    console.log('Connected');

    createDatabase.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`, (error, result) => {
        if(error){throw error}
        console.log("Database Created");

        var createTable = mysql.createConnection({
            host        :   'localhost',
            user        :   'root',
            password    :   '',
            database    :   dbName
        });

        var sql = `CREATE TABLE IF NOT EXISTS ${userTable} (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(100) DEFAULT '',
            message VARCHAR(255) DEFAULT '',
            PRIMARY KEY (id)
        );`
        createTable.query(sql, (error, result) => {
            if(error){throw error}
            console.log("Table Created");
        });
    });
});


// connection.end();

app.listen(port, () => {console.log(`Listening to port ${port}`)})