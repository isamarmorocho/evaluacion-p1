const httpError = (statusCode, message) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

const sendError = (res, error) =>
  res.status(error.statusCode || 500).json({ error: error.message });

module.exports = { httpError, sendError };
