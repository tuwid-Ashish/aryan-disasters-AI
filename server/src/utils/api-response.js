export function sendSuccess(res, data, message = "Request successful", statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
}

export function sendError(res, message = "Something went wrong", statusCode = 500, details = null) {
  return res.status(statusCode).json({
    success: false,
    message,
    details
  });
}

