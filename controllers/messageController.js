// import db queries
const db = require('../db/queries');

// express validator
const {
  body /*, validationResult, matchedData*/,
} = require('express-validator');

const validateMessage = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 4, max: 30 })
    .withMessage('Title must be between 4 and 30 characters'),

  body('body')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 255 })
    .withMessage('Message must be between 10 and 255 characters'),
];

const showIndex = async (req, res) => {
  let errors;
  if (req.query.error && req.query.error === 'notloggedin') {
    errors = [{ msg: 'You need to log in to do that' }];
  } else {
    errors = null;
  }
  res.render('messages', { title: 'Messages', errors: errors });
};

const showAddMessage = async (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/?error=notloggedin');
  } else {
    res.render('add-message', { title: 'Add Message' });
  }
};

const addMessage = async (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/?error=notloggedin');
  } else {
    res.render('add-message', { title: 'Add Message' });
  }
};

module.exports = { validateMessage, showIndex, showAddMessage, addMessage };
