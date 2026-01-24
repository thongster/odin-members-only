// import db queries
const db = require('../db/queries');

// express validator
const { body, validationResult, matchedData } = require('express-validator');

const validateMember = [
  body('secret')
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage('Answer is required')
    .isIn(['rasengan'])
    .withMessage('Title must be between 4 and 30 characters'),
];

const validateAdmin = [
  body('secret')
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage('Answer is required')
    .isIn(['l'])
    .withMessage('Title must be between 4 and 30 characters'),
];

const showMembership = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/?error=notloggedin');
  }

  res.render('membership', { title: 'Membership' });
};

const changeMembership = async (req, res) => {
  try {
    await db.makeMember(req.user.id);
    return res.redirect('/?success=membership');
  } catch (error) {
    console.error(error);
    return res.redirect('/?error=membershiperror');
  }
};

const showAdmin = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/?error=notloggedin');
  }

  res.render('admin', { title: 'Admin' });
};

const changeAdmin = async (req, res) => {
  try {
    await db.makeAdmin(req.user.id);
    return res.redirect('/?success=admin');
  } catch (error) {
    console.error(error);
    return res.redirect('/?error=adminerror');
  }
};

module.exports = {
  showMembership,
  showAdmin,
  changeMembership,
  changeAdmin,
  validateMember,
  validateAdmin,
};
