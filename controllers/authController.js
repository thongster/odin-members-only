// import db queries
const db = require('../db/queries');
const passport = require('../config/passport');
const bcrypt = require('bcryptjs');

// express validator
const {
  body /*, validationResult, matchedData*/,
} = require('express-validator');

const validateUserSignUp = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email address')
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage('Email is too long'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6, max: 100 })
    .withMessage('Password must be at least 6 characters'),
  body('first_name')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be under 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('First name contains invalid characters'),
  body('last_name')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be under 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Last name contains invalid characters'),
];

const validateUserLogIn = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email address')
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage('Email is too long'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6, max: 100 })
    .withMessage('Password must be at least 6 characters'),
];

const showSignUp = async (req, res) => {
  res.render('sign-up-form', { title: 'Sign Up' });
};

const signUp = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.query(
      'INSERT INTO users (email, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4)',
      [
        req.body.username,
        hashedPassword,
        req.body.first_name,
        req.body.last_name,
      ]
    );
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const ShowLogIn = async (req, res) => {
  res.render('log-in', { title: 'Log In' });
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

module.exports = {
  validateUserSignUp,
  validateUserLogIn,
  showSignUp,
  signUp,
  ShowLogIn,
  logIn,
  logOut,
};
