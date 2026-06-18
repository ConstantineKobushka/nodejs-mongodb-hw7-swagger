import createError from 'http-errors';

import { getSession, getUser } from '../services/auth.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return next(createError(401, 'Authorization header not found'));
  }

  const [bearer, accessToken] = authHeader.split(' ');
  if (bearer !== 'Bearer') {
    return next(createError(401, 'Header must be Bearer type'));
  }

  const session = await getSession({ accessToken });
  if (!session) {
    return next(createError(401, 'Session not found'));
  }

  if (Date.now() > session.accessTokenValidUntil) {
    return next(createError(401, 'Access token expired'));
  }

  const user = await getUser({ _id: session.userId });
  if (!user) {
    return next(createError(401, 'User not found'));
  }

  req.user = user;

  next();
};
