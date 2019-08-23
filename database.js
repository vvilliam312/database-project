var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "nationality.db" 
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.log("FEL?!")
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQlite database.')
        
    }
})
module.exports = db

