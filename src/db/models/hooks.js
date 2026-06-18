export const saveErrorHandler = (error, doc, next) => {
  const { name, code } = error;
  error.status = name === 'MongoServerError' && code === 11000 ? 409 : 400;

  if (next) {
    next(error);
  }
};

export const setUpdateSettings = function (next) {
  this.options.new = true;
  this.options.runValidators = true;

  if (next) {
    next();
  }
};
