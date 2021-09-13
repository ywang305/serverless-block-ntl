export const errorHandler = (opt = {}) => {
  const httpErrorHandlerMiddlewareOnError = (request) => {
    const { error } = request;
    const response = {
      statusCode: error.response.status,
      body: JSON.stringify({
        ...error,
        code: error.response.status,
        message: error.message,
        data: error.response.data,
      }),
    };
    return response;
  };
  return {
    onError: httpErrorHandlerMiddlewareOnError,
  };
};
