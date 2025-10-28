import { NextFunction, Request, Response } from 'express';

export const errorHandler = (req: Request, res: Response) => {
  res.status(500).json({
    resultType: 'FAIL',
    error: {
      errorCode: 500,
      data: null
    },
    success: null
  });
};
