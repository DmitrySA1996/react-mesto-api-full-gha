const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;

try {
  const payload = jwt.verify(NODE_ENV, JWT_SECRET);
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

const checkToken = (token) => jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : 'key');

const signToken = (payload) => jwt.sign(payload, NODE_ENV === 'production' ? SECRET_KEY : 'key', { expiresIn: '7d' });

module.exports = {
  checkToken,
  signToken,
};