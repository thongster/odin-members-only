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

const indexMessages = {
  error: {
    notloggedin: 'You need to log in to do that',
    alreadyloggedin: "You're already logged in",
    membershiperror: 'Something went wrong while updating membership',
    adminerror: 'Something went wrong while updating admin',
    alreadyamember: "You're already a member!",
    alreadyanadmin: "You're already an admin!",
    deletemessagefailed: 'Something went wrong with deleting the message',
  },
  success: {
    membership: 'You are now a club member!',
    admin: 'You are now an admin!',
    messagedeleted: 'Messaged deleted successfully!',
  },
};

const showIndex = async (req, res) => {
  let status = null;

  if (req.query.error) {
    const msg = indexMessages.error[req.query.error];
    if (msg) {
      status = [{ msg }];
    }
  }

  if (req.query.success) {
    const msg = indexMessages.success[req.query.success];
    if (msg) {
      status = [{ msg }];
    }
  }

  const messages = await db.getMessages();
  res.render('messages', {
    title: 'Messages',
    status: status,
    messages: messages,
  });
};

const showAddMessage = async (req, res) => {
  let status;
  if (!req.isAuthenticated()) {
    return res.redirect('/?error=notloggedin');
  } else if (req.query.error && req.query.error === 'addmessagefailed') {
    status = [{ msg: "You're already logged in" }];
  }

  res.render('add-message', { title: 'Add Message', status: status });
};

const addMessage = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/?error=notloggedin');
  } else {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('add-message', {
        status: errors.array(),
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

const deleteMessage = async (req, res) => {
  try {
    await db.deleteMessageById(req.params.message_id);
    return res.redirect('/?success=messagedeleted');
  } catch (error) {
    console.error(error);
    return res.redirect('/?error=deletemessagefailed');
  }
};

module.exports = {
  validateMessage,
  showIndex,
  showAddMessage,
  addMessage,
  deleteMessage,
};
