const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });
const { NODE_ENV, JWT_SECRET } = process.env;

const checkToken = (token) => jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'key');

const signToken = (id) => jwt.sign(id, NODE_ENV === 'production' ? JWT_SECRET : 'key', { expiresIn: '7d' });

try {
  checkToken;
  console.log('\x1b[31m%s\x1b[0m', `
Надо исправить. В продакшне используется тот же
секретный ключ, что и в режиме разработки.
`);
} catch (err) {
  if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
    console.log(
      '\x1b[32m%s\x1b[0m',
      'Всё в порядке. Секретные ключи отличаются'
    );
  } else {
    console.log(
      '\x1b[33m%s\x1b[0m',
      'Что-то не так',
      err
    );
  }
}
module.exports = {
  checkToken,
  signToken,
};