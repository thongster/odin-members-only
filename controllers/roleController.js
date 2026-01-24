// import db queries
const db = require('../db/queries');

const showMembership = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/?error=notloggedin');
  }

  res.render('membership', { title: 'Membership' });
};

module.exports = { showMembership };
