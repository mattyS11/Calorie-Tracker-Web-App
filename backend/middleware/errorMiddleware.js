// Generic errorHandler to overwrite default express error handler which returns an HTML page.
const errorHandler = (err, req, res, next) => {
  // If it is a server error, return a 500 status code, otherwise we just return the default status code on error.
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
