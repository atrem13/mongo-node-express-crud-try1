const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 
app.use('/', indexRouter);
app.use('/users', usersRouter);

// connect to mongodb
const db = require('./models/index');
db.mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology:true
}).then(() => {
  console.log('connected to mongodb');
}).catch((err) => {
  console.log('cant conect to mongodb ', err);
  process.exit();
});

// router
require('./routes/tutorial.routes')(app);

module.exports = app;
