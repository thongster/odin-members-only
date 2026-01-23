// import db queries
const db = require('../db/queries');

// express validator
const { body, validationResult, matchedData } = require('express-validator');

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
  console.log(req.query.error);
  let errors;
  if (req.query.error && req.query.error === 'notloggedin') {
    errors = [{ msg: 'You need to log in to do that' }];
  } else if (req.query.error && req.query.error === 'alreadyloggedin') {
    errors = [{ msg: "You're already logged in" }];
  } else {
    errors = null;
  }

  console.log(errors);
  res.render('messages', { title: 'Messages', errors: errors });
};

const showAddMessage = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/?error=notloggedin');
  } else {
    res.render('add-message', { title: 'Add Message' });
  }
};

const addMessage = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/?error=notloggedin');
  } else {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('sign-up-form', {
        errors: errors.array(),
        formData: req.body,
        title: 'Sign Up',
      });
    }

    const { title, body } = matchedData(req);

    try {
      await db.submitNewMessage(req.currentUser.id, title, body);
      res.render('messages', { title: 'Messages' });
    } catch (error) {
      console.error(error);
      return res.status(500).render('sign-up-form', {
        errors: [{ msg: 'Something went wrong. Please try again.' }],
        formData: req.body,
        title: 'Sign Up',
      });
    }
  }
};

module.exports = { validateMessage, showIndex, showAddMessage, addMessage };
