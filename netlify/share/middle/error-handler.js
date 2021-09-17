export const errorHandler = (opt = {}) => {
  const httpErrorHandlerMiddlewareOnError = (request) => {
    const { error } = request;
    const statusCode = error.response?.status ?? 500;
    const response = {
      statusCode,
      body: JSON.stringify({
        ...error,
        statusCode,
        message: error.message,
        data: error.response?.data,
      }),
    };
    return response;
  };
  return {
    onError: httpErrorHandlerMiddlewareOnError,
  };
};
