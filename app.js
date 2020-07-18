var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
const bodyParser = require("body-parser");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
var cors = require('cors')
var app = express()
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(process.env.port || 4000, function () {
  console.log('listening at 4000');
});


// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root2",
//   database: "database2"
// });

// con.connect(function(err) {
//   if (err) {
//   console.log(err);
//   }
//   else{
//     console.log("DB connected !");
//     con.query("SELECT * FROM database.table1", function (err, result, fields) {
//       if (err) throw err;
//       console.log(result);
//     });
//   }
// });
module.exports = app;
// module.exports.con = con;
