var express = require("express")
var app = express()
var db = require("./database.js")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    var sql = `SELECT users.id,users.name,users.lastname,country.country_name,nationality.origin,users.gender,users.age FROM users INNER JOIN country
    ON users.country_id = country.id
    INNER JOIN nationality
    ON users.nationality_id = nationality.id
    `
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

app.get("/userdata/:id", (req, res, next) => {
    var sql = "SELECT * FROM info where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});



// //Delete//
// app.delete("/getall/:id", (req, res, next) => {
//     var sql = `SELECT users.id,info.gender,info.age,users.name,users.lastname,country.country_name,nationality.origin FROM users INNER JOIN country
//     ON users.country_id = country.id
//     INNER JOIN nationality
//     ON users.nationality_id = nationality.id
//     INNER JOIN info
// 	ON info_id =info.id
//     `
//     var params = []
//     db.all(sql, params, (err, rows) => {
//         if (err) {
//           res.status(400).json({"error":err.message});
//           return;
//         } 
//         res.json({
//             "message":"success",
//             "data":rows
//         })
//       });
// });


//ADD// 

app.post("/adduser", (req, res, next) => {
    console.log(req.body); 
    
    var sql = `INSERT INTO nationality (origin) values('${req.body.origin}')`
    var sql2 = `INSERT INTO country (country_name) values('${req.body.country}')`
    var sql3 = `INSERT INTO users (name,lastname) values('${req.body.name}','${req.body.lastname}')`//SIST
    var nid;
    var cid;
    

    var params = []
    
    db.run(sql, params,  function (err) {
       
        
        if (err) {
          res.status(400).json({"error":err.message});
          
          return;
        } 
        nid = this.lastID;

      }).run (sql2, params, function (err) {
          
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        } 
     cid = this.lastID;
     db.run (`INSERT INTO users (name,lastname,country_id,nationality_id,gender,age) values('${req.body.name}','${req.body.lastname}','${nid}','${cid}','${req.body.gender}','${req.body.age}')`, params, function (err) {
        
        if (err) {
            
          res.status(400).json({"error":err.message});
          return;
        } 
        res.json({
            "message":"Ok",
           
        })
        
      });
        
      })

});