// set up express
require('dotenv').config();
const path = require('node:path');
const express = require('express');
const session = require('express-session');
const app = express();

// set up ejs using views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(express.static(path.join(__dirname, 'public'))); // load static files
app.use(express.urlencoded({ extended: true })); // parse form info

// import routers
const authRouter = require('./routes/authRouter');

// set up sessions and passport
const passport = require('./config/passport');
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());

app.use('/', authRouter);

// error handling
app.use((req, res) => {
  res.status(404).send('<h1>Error 404</h1>');
  //   res.status(404).render("404");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('<h1>Error 500</h1>');
  //   res.status(500).render("500");
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server listening on port ${PORT}!`);
});
