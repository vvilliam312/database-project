var express = require("express")
var app = express()
var db = require("./database.js")

// var bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

var HTTP_PORT = 8000

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.use(express.static('public'))


// Root path
app.get("/", (req, res, next) => {
    res.json({
        "message":"success",
       
    })  
});

app.get("/getall", (req, res, next) => {
    var sql = `SELECT users.name,users.lastname,country.country_name,nationality.origin FROM users INNER JOIN country
    ON users.country_id = country.id
    INNER JOIN nationality
    ON users.nationality_id = nationality.id`
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        } 
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/all", (req, res, next) => {
    var sql = `SELECT users.name,users.lastname FROM users`
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        } 
        res.json({
            "message":"success",
            "data":rows
        })
      });
});
