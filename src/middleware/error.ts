import { NextFunction, Request, Response } from 'express';

// errors/HttpError.js
class HttpError extends Error {
  status: number;
  code: string;
  constructor(
    status = 500,
    message = 'Internal Server Error',
    code = 'INTERNAL_ERROR'
  ) {
    super(message);
    this.status = status;
    this.code = code; // 비즈니스 에러 코드
  }
}
// 전체 에러클래스

// 에러 상황이 발생한다면 에러클래스를 상속받아 구현
class ValidationError extends HttpError {
  constructor(errors: Error) {
    console.log(errors);
    super(400, 'Validation Failed', 'VALIDATION_ERROR');
  }
}

class DuplicatedError extends HttpError {
  constructor() {
    super(409, '중복된 아이디', 'DUPLICATED_ID');
  }
}

class StoreNotFoundError extends HttpError {
  constructor() {
    super(404, '가게가 존재하지 않습니다.', 'STORE_NOT_FOUND');
  }
}

class MissionNotFoundError extends HttpError {
  constructor() {
    super(404, '미션을 찾을 수 없습니다.', 'MISSION_NOT_FOUND');
  }
}

class UserNotFoundError extends HttpError {
  constructor() {
    super(404, '사용자를 찾을 수 없습니다.', 'USER_NOT_FOUND');
  }
}

class UnauthorizedError extends HttpError {
  constructor(message = '인증이 필요합니다.') {
    super(401, message, 'UNAUTHORIZED');
  }
}

class ForbiddenError extends HttpError {
  constructor(message = '접근 권한이 없습니다.') {
    super(403, message, 'FORBIDDEN');
  }
}

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const e = new HttpError(404, 'not !', 'e404');
  res.failResponse('not found', e);
};

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.failResponse('unknown server error', new HttpError());
};

export {
  HttpError,
  ValidationError,
  DuplicatedError,
  StoreNotFoundError,
  MissionNotFoundError,
  UserNotFoundError,
  UnauthorizedError,
  ForbiddenError,
  notFound,
  errorHandler
};
