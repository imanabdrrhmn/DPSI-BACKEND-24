var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var categoriesRouter = require('./routes/categories');
var authRouter = require('./routes/auth');
var employeeRouter = require("./routes/employee")
var customerRouter = require("./routes/customer");
var orderRouter = require("./routes/order");
var orderDetailRouter = require("./routes/orderDetail");
var shipperRouter = require("./routes/shipper");
var supplierRouter = require("./routes/supplier");
var { sequelize } = require('./models/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/auth', authRouter);
app.use("/customer", customerRouter);
app.use("/employee", employeeRouter);
app.use("/order", orderRouter);
app.use("/orderDetail", orderDetailRouter);
app.use("/shipper", shipperRouter);
app.use("/supplier", supplierRouter);

// sync database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database', err);
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
