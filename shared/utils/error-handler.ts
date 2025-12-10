export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Not Found') {
    super(message, 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}

export const handleError = (error: Error, req: any, res: any) => {
  if (error instanceof AppError) {
    return res.status((error as AppError).statusCode).json({
      success: false,
      error: error.message
    });
  }
  console.error('Unhandled error:', error);
  return res.status(500).json({
    success: false,
    error: 'Internal Server Error'
  });
};
