const notFound = (requestObject, responseObject, next) => {
  const error = new Error(`Not found: ${requestObject.originalUrl}`);
  responseObject.status(404);
  next(error);
};
const errorHandler = (error, requestObject, responseObject, next) => {
  const statuscode =
    responseObject.statusCode === 200 ? 500 : responseObject.statusCode;
  responseObject.status(statuscode);
  responseObject.json({ message: error?.message, stack: error?.stack });
};

module.exports = { notFound: notFound, errorHandler: errorHandler };
