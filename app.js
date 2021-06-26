var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//user define module's
var dsahbordmodule = require('./routes/dashboard');
var password_catagory = require('./routes/password-catagory');
var add_catagory = require('./routes/add-catagory');
var add_password = require('./routes/add-password');
var delete_router = require('./routes/deleterouter');
var edit_router = require('./routes/editrouter');
var viewdata_router = require('./routes/viewdata');
var viewdatadelete_router = require('./routes/viewdatadelete');
var viewdataedit_router = require('./routes/viewdataedit');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//using user define module's
app.use('/dashboard',dsahbordmodule);
app.use('/passwordcategoryview',password_catagory);
app.use('/addcatrgory',add_catagory);
app.use('/addpassword',add_password);
app.use('/addpassworddata',add_password);
app.use('/delete',delete_router);
app.use('/edit',edit_router);
app.use('/update',edit_router);
app.use('/viewdetails',viewdata_router);
app.use('/viewdetaildelete',viewdatadelete_router);
app.use('/viewdetailsedit',viewdataedit_router);
app.use('/viewdetailsup',viewdataedit_router);


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

module.exports = app;
