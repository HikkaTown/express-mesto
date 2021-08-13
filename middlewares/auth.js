const jwt = require('jsonwebtoken');
const IncorrectDataError = require('../errors/incorrect-data-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new IncorrectDataError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (e) {
    throw new IncorrectDataError('Необходима авторизация');
  }
  req.user = payload;
  next();
};
