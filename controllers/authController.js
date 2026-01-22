// import db queries
const db = require('../db/queries');
const passport = require('../config/passport');
const bcrypt = require('bcryptjs');

// express validator
const { body, validationResult, matchedData } = require('express-validator');

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
  body('confirmPassword')
    .notEmpty()
    .withMessage('Password confirmation is required')
    .bail()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage('Passwords do not match'),
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

const signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('sign-up-form', {
      errors: errors.array(),
      formData: req.body,
      title: 'Sign Up',
    });
  }

  const { username, password, first_name, last_name } = matchedData(req);

  console.log(username, password, first_name, last_name);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.submitNewUser(username, hashedPassword, first_name, last_name);
    res.render('messages', { title: 'Messages' });
  } catch (error) {
    console.error(error);
    return res.status(500).render('sign-up-form', {
      errors: [{ msg: 'Something went wrong. Please try again.' }],
      formData: req.body,
      title: 'Sign Up',
    });
  }
};

const ShowLogIn = async (req, res) => {
  res.render('log-in', { title: 'Log In' });
};

const logIn = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('log-in', {
      errors: errors.array(),
      formData: req.body,
      title: 'Log In',
    });
  }

  passport.authenticate('local', (err, user, info) => {
    // if database error or server fail
    if (err) {
      return next(err);
    }

    // if user does not match
    if (!user) {
      return res.status(401).render('log-in', {
        errors: [{ msg: info?.message }],
        formData: req.body,
        title: 'Log In',
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
};

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
