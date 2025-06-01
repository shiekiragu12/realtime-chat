// src/middlewares/errorHandler.js

module.exports = (err, req, res, next) => {
  console.error('🔥 Error:', err);

  const statusCode = err.status || 500;
  const message = err.message || 'Something went wrong';

  // Sequelize-specific errors
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    const validationErrors = err.errors.map((e) => e.message);
    return res.status(400).json({
      status: 'error',
      message: 'Validation Error',
      errors: validationErrors,
    });
  }

  res.status(statusCode).json({
    status: 'error',
    message,
  });
};
