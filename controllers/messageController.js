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
  let errors;
  if (req.query.error && req.query.error === 'notloggedin') {
    errors = [{ msg: 'You need to log in to do that' }];
  } else if (req.query.error && req.query.error === 'alreadyloggedin') {
    errors = [{ msg: "You're already logged in" }];
  } else {
    errors = null;
  }

  const messages = await db.getMessages();
  console.log(messages);
  console.log(errors ? errors : 'no error on show index');
  res.render('messages', {
    title: 'Messages',
    errors: errors,
    messages: messages,
  });
};

const showAddMessage = async (req, res) => {
  let errors;
  if (!req.isAuthenticated()) {
    return res.redirect('/?error=notloggedin');
  } else if (req.query.error && req.query.error === 'addmessagefailed') {
    errors = [{ msg: "You're already logged in" }];
  }

  res.render('add-message', { title: 'Add Message', errors: errors });
};

const addMessage = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/?error=notloggedin');
  } else {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('add-message', {
        errors: errors.array(),
        formData: req.body,
        title: 'Add Message',
      });
    }

    const { title, body } = matchedData(req);

    console.log(req.user);

    try {
      await db.submitNewMessage(req.user.id, title, body);
      res.redirect('/');
    } catch (error) {
      console.error(error);
      return res.redirect('/add-message');
    }
  }
};

module.exports = { validateMessage, showIndex, showAddMessage, addMessage };
