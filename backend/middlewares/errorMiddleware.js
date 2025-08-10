// Catch 404 and forward to error handler
exports.notFound = (req, res, next) => {
  res.status(404).json({ message: `🔍 Not Found: ${req.originalUrl}` });
};

// General error handler
exports.errorHandler = (err, req, res, next) => {
  console.error("Error middleware:", err.stack);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
