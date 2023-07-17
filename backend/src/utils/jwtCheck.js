const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });
const { JWT_SECRET } = 'f1c81533098ee359576bb24a9df5fbd06c4dfe93e3a23900323c05f66445bb5d';

const checkToken = (token) => jwt.verify(token, JWT_SECRET : 'key');

const signToken = (id) => jwt.sign(id, JWT_SECRET : 'key', { expiresIn: '7d' });

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
