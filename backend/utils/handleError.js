const handleError = (res, error, message = 'Something went wrong', statusCode = 500) => {
  console.error('❌ Error:', error.message || error);
  res.status(statusCode).json({
    success: false,
    message,
    error: error.message || error,
  });
};

module.exports = handleError;
