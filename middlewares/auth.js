/* eslint-disable no-shadow */
/* eslint-disable no-empty */
const jwt = require('jsonwebtoken');
const IncorrectDataError = require('../errors/incorrect-data-err');

module.exports = (req, res, next) => {
  const tokenJWT = req.cookies.jwt;
  if (!tokenJWT) {
    throw new IncorrectDataError('Необходима авторизация');
  }
  const token = tokenJWT;
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (next) {
  }
  req.user = payload;
  next();
};
