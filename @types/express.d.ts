import 'express';
import { HttpError } from '../src/middleware/error';

declare global {
  namespace Express {
    export interface Response {
      resultType: string;
      data: any;
      successResponse(message: string, data?: any, status: number): Response;
      failResponse(message: string, error: HttpError): Response;
    }
  }
}
