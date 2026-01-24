const pool = require('./pool');

const submitNewUser = async (
  username,
  hashedPassword,
  first_name,
  last_name
) => {
  await pool.query(
    'INSERT INTO users (email, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4)',
    [username, hashedPassword, first_name, last_name]
  );
};

const getUserByUsername = async (username) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
    username,
  ]);
  return rows[0];
};

const getUserById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return rows[0];
};

const submitNewMessage = async (user_id, title, body) => {
  await pool.query(
    'INSERT INTO messages (user_id, title, body) VALUES ($1, $2, $3)',
    [user_id, title, body]
  );
};

const getMessages = async () => {
  const { rows } = await pool.query(`
    SELECT messages.id AS message_id,
    messages.title,
    messages.body,
    messages.created_at,
    users.id AS user_id,
    users.first_name,
    users.last_name,
    users.is_member,
    users.is_admin
    FROM messages 
    JOIN users
    ON messages.user_id = users.id
    ORDER BY created_at DESC`);

  return rows;
};

const makeMember = async (user_id) => {
  await pool.query(
    `
      UPDATE users 
      SET is_member = true
      WHERE id = $1
    `,
    [user_id]
  );
};

const makeAdmin = async (user_id) => {
  await pool.query(
    `
      UPDATE users 
      SET is_member = true, is_admin = true
      WHERE id = $1
    `,
    [user_id]
  );
};

module.exports = {
  submitNewUser,
  getUserByUsername,
  getUserById,
  submitNewMessage,
  getMessages,
  makeMember,
  makeAdmin,
};
