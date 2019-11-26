import { isValidToken, getJsonFromToken } from './jwt';

const getUserId = async (request, throws = true) => {
  const {
    headers: { authorization },
  } = request;

  if (!authorization && throws) {
    throw new Error('Authorization required');
  }

  if (authorization) {
    const token = authorization.replace('Bearer ', '');

    if (isValidToken(token)) {
      const data = getJsonFromToken(token);
      if (data.id) {
        return data.id;
      }
    }
  }

  if (throws) {
    throw new Error('Unauthorized');
  }

  return null;
};

export { getUserId as default };
