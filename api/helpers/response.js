function responseHandler(statusCode, message, data, res) {
  if (data.length < 1) return res.status(404).send({ status: 404, error: 'Ooop not found' });
  return res.status(statusCode).send({
    status: statusCode,
    message,
    data,
  });
}

export default responseHandler;
