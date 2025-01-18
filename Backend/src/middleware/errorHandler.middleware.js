import { ApiResponse } from "../utilities/ApiResponse.js";
import { ApiError } from "../utilities/apiError.js";


const errorHandler = (err, req, res, next) => {
  // 1. If no error is passed, return an internal server error
  if (!err) {
    console.error("Unknown error:", err);
    return res.status(500).json(new ApiResponse(500, null, 'Unknown error'));
  }

  // 2. Log the error for debugging (do not log errors in production)
  if (process.env.NODE_ENV === 'development') {
    console.error("Error Details:", err);
  }

  // 3. Handle custom API errors (from ApiError class)
  if (err instanceof ApiError) {
    return res.status(err.statusCode || 500).json(new ApiResponse(err.statusCode, null, err.message, err.errors));
  }

  // 4. Handle validation errors (e.g., from mongoose)
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    return res.status(400).json(new ApiResponse(400, null, `Validation Error: ${message}`));
  }

  // 5. Handle SyntaxError (malformed JSON)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json(new ApiResponse(400, null, 'Invalid JSON syntax'));
  }

  // 6. Handle unauthorized errors (401)
  if (err.statusCode === 401) {
    return res.status(401).json(new ApiResponse(401, null, 'Unauthorized request'));
  }

  // 7. Handle not found errors (404)
  if (err.statusCode === 404) {
    return res.status(404).json(new ApiResponse(404, null, 'Resource not found'));
  }

  // 8. Handle forbidden errors (403)
  if (err.statusCode === 403) {
    return res.status(403).json(new ApiResponse(403, null, 'Forbidden access'));
  }

  // 9. Handle internal server errors (500)
  if (err instanceof Error) {
    return res.status(500).json(new ApiResponse(500, null, 'Internal Server Error'));
  }

  // 10. Fallback if no error matches
  console.error("Unexpected error:", err);
  return res.status(500).json(new ApiResponse(500, null, 'Something went wrong'));
};

export default errorHandler;

