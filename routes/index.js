var express = require('express');
var router = express.Router();
// const con = require("../app");
var mysql = require('mysql');
var csvParser = require('csv-parse');
var fs = require('fs');
const upload = require("../fileUpload");
var app = express()



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root2",
  database: "database2"
});
con.connect(function(err) {
  if (err) {
  console.log(err);
  }
  else{
    console.log("DB connected !");
   
  }
});
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.send("HI hellow");
  console.log("API called")
  con.query("SELECT * FROM table1", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result)
  });

});

router.get('/toDatabase', function(req, res, next) {
  
  console.log("API called for saving data to db",  process.cwd()+"/upload/data.csv")
  fs.readFile( process.cwd()+"/upload/data.csv", {
    encoding: 'utf-8'
  }, function(err, csvData) {
    if (err) {
      console.log(err);
    }
  
    csvParser(csvData, {
      delimiter: ','
    }, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        var tem = data.slice(1)
        var sql = "INSERT INTO table1 (id, level, cvss, title, Vulnerability, solution, reference) VALUES ?"
        // var sql = "INSERT INTO table1 (id, level, cvss, title, Vulnerability, solution, reference) VALUES (01, 'Test', 1,'test', 'test', 'test','tets')";
  con.query(sql,[tem], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted", result);
    res.send(result)
  });
      }
    });
  });
});

router.post('/uploadCsv', function(req, res, next) {
  console.log("API called to upload CSV", req.body)
  upload(req, res).then(result => {
    console.log("response", result);
    console.log("API called for saving data to db",  process.cwd()+"/upload/data.csv")
  fs.readFile( process.cwd()+"/upload/"+result['imagePath'], {
    encoding: 'utf-8'
  }, function(err, csvData) {
    if (err) {
      console.log(err);
    }
  
    csvParser(csvData, {
      delimiter: ','
    }, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        var tem = data.slice(1)
        var sql = "INSERT INTO table1 (id, level, cvss, title, Vulnerability, solution, reference) VALUES ?"
        // var sql = "INSERT INTO table1 (id, level, cvss, title, Vulnerability, solution, reference) VALUES (01, 'Test', 1,'test', 'test', 'test','tets')";
  con.query(sql,[tem], function (err, result) {
    if (err) {
      console.log("Error in saving data", err);
      res.status(400).send({msg:"Somthing wrong"});
    }
    console.log("1 record inserted", result);
    res.send(result);
  });
      }
    });
  });
}, err => {
    console.log("error", err);
    res.status(400).send({ status: "failure", msg: err });
});

});

router.get('/getCsvData', function(req, res, next) {
  console.log("API called to get all data")
  con.query("SELECT * FROM table1 limit 0,10", function (err, result, fields) {
    if (err) throw err;
    res.status(200).send({"result":result});
  });
  });

  router.post('/updateOneCsvData', function(req, res, next) {
    console.log("API called to update one data", req.body)
    var sql = `UPDATE database2.table1 SET  level= "${req.body.level}",  cvss= ${req.body.cvss} , title= "${req.body.title}" , Vulnerability= "${req.body.Vulnerability}" ,Solution= "${req.body.Solution}" ,reference= "${req.body.reference}" WHERE id = ${req.body.id}`
    console.log("query",sql)
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.status(200).send({"result":result});
    });
    });
    
    router.post('/getPaginationData', function(req, res, next) {
      console.log("API called to update one data", req.body)
      var sql = `SELECT * FROM table1 limit ${req.body.skip},${req.body.limit}`
      console.log("query",sql)
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.status(200).send({"result":result});
      });
      });
      

      router.get('/getCountOfData', function(req, res, next) {
        console.log("API called count of data")
        con.query("SELECT COUNT(id) AS count FROM database2.table1", function (err, result, fields) {
          if (err) throw err;
          // console.log("result::", result[0].count)
          res.status(200).send({"result":result[0]});  
        });
        });

        router.get('/getAllCsvData', function(req, res, next) {
          console.log("API called count of data")
          con.query("SELECT * FROM database2.table1", function (err, result, fields) {
            if (err) throw err;
            // console.log("result::", result[0].count)
            res.status(200).send({"result":result});  
          });
          });
  
        
module.exports = router;
 