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
  res.render('messages', { title: 'Messages' });
};

const showAddMessage = async (req, res) => {
  if (!req.isAuthenticated()) {
    res.render('messages', {
      title: 'Messages',
      errors: [{ msg: 'Only members can add messages' }],
    });
  } else {
    res.render('add-message', { title: 'Add Message' });
  }
};

const addMessage = async (req, res) => {
  if (!req.isAuthenticated()) {
    res.render('messages', {
      title: 'Messages',
      errors: [{ msg: 'Only members can add messages' }],
    });
  } else {
    res.render('add-message', { title: 'Add Message' });
  }
};

module.exports = { validateMessage, showIndex, showAddMessage, addMessage };
