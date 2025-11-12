import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../middleware/error';

export class ResponseBase {
  resultType: string;
  data: any = null;
  message: string;
  error?: HttpError;

  constructor({
    resultType,
    data,
    message,
    error
  }: {
    resultType: string;
    data: any;
    message: string;
    error?: HttpError;
  }) {
    this.resultType = resultType;
    this.data = data;
    this.message = message;
    this.error = error;
  }
}

/**
 * 전역 응답 핸들러 미들웨어
 * Response 객체에 successResponse와 failResponse 메서드를 추가합니다.
 */
export const responseHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 성공 응답 헬퍼 메서드
  res.successResponse = (
    data: any = null,
    message: string = '요청이 성공적으로 처리되었습니다.'
  ) => {
    return res.json(
      new ResponseBase({
        resultType: 'SUCCESS',
        data,
        message
      })
    );
  };

  // 실패 응답 헬퍼 메서드
  res.failResponse = (
    message: string = '요청 처리 중 오류가 발생했습니다.',
    error: HttpError
  ) => {
    return res.status(error.status).json(
      new ResponseBase({
        resultType: 'FAIL',
        data: null,
        message: error.message,
        error: error
      })
    );
  };
  next();
};
