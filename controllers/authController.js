// import db queries
const db = require('../db/queries');
const passport = require('../config/passport');
const bcrypt = require('bcryptjs');

// express validator
const {
  body /*, validationResult, matchedData*/,
} = require('express-validator');

const validateUser = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username (email) is required')
    .isLength({ min: 2, max: 30 })
    .withMessage('Username (email) must be between 2 and 30 characters'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 4, max: 30 })
    .withMessage('Password must be between 4 and 30 characters'),
];

const showSignUp = async (req, res) => {
  res.render('sign-up-form', { title: 'Sign Up' });
};

const signUp = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.query('INSERT INTO users (email, password_hash) VALUES ($1, $2)', [
      req.body.username,
      hashedPassword,
    ]);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const logIn = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
});

const logOut = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

module.exports = { validateUser, showSignUp, signUp, logIn, logOut };
