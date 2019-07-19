function errorHandler(statusCode, message, res) {
  return res.status(statusCode).send({
    status: statusCode,
    message,
  });
}
export default errorHandler;
