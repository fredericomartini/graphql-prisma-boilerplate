import jwt from 'jsonwebtoken';

const AUTH_TOKEN = 'MY-SUPER-SECRET';

const makeToken = (data = {}) => {
  return jwt.sign(data, AUTH_TOKEN);
};

const isValidToken = token => {
  return jwt.verify(token, AUTH_TOKEN);
};

const getJsonFromToken = token => {
  return jwt.decode(token);
};

export { makeToken, isValidToken, getJsonFromToken };
