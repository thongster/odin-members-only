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

// set up sessions and passport
const passport = require('./config/passport');
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());

app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});
app.get('/sign-up', (req, res) => res.render('sign-up-form'));
app.post('/sign-up', async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [
      req.body.username,
      hashedPassword,
    ]);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});
app.post(
  '/log-in',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
  })
);
app.get('/log-out', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

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
