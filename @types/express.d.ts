import 'express';
import { CustomJwt } from './jwt';
import { HttpError } from '../src/middleware/error';

declare global {
  namespace Express {
    export interface Response {
      resultType: string;
      data: any;
      successResponse(data?: any, message: string): Response;
      failResponse(message: string, error: HttpError): Response;
    }
  }
}
