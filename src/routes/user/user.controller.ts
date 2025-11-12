import express from 'express';
import { UserService } from './user.service';
import { SignupDTO } from './user.dto';
import { Request, Response } from 'express';
import { ResponseBase } from '../../config/response';
import { HttpError } from '../../middleware/error';

const userRouter = express.Router();
class UserController {
  // {
  //   "name": "홍길동",
  //   "id": "hong123",
  //   "password": "securePassword123!",
  //   "email": "hong@example.com",
  //   "birthday": "2023-11-04T10:00:00+09:00",
  //   "address": "서울시 강남구 테헤란로 123",
  //   "gender": 1,
  //   "profile_url": "https://example.com/profiles/hong123.jpg",
  //   "phone": "010-1234-5678"
  // }
  static async signup(req: Request, res: Response) {
    try {
      const body = new SignupDTO(req.body);
      await UserService.signupService(body);
      res.successResponse(null, '회원가입성공');
    } catch (error: any) {
      res.failResponse('회원가입 실패', error);
    }
  }
}

userRouter.post('/signup', UserController.signup);

export { userRouter };
