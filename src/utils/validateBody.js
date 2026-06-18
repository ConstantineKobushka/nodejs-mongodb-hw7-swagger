import createError from 'http-errors';

export const validateBody = schema => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      next(createError(400, error.message));
    }
  };
};
