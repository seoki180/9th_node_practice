import express from 'express';
import { UserService } from './user.service';
import { SignupDTO } from './user.dto';
import { Request, Response } from 'express';
import { ResponseBase } from '../../config/response';
import { HttpError } from '../../middleware/error';

const userRouter = express.Router();
export class UserController {
  static async signup(req: Request, res: Response) {
    try {
      const body = new SignupDTO(req.body);
      await UserService.signupService(body);
      res.successResponse('회원가입성공', null, 202);
    } catch (error: any) {
      res.failResponse('회원가입 실패', error);
    }
  }
}

userRouter.post('/signup', UserController.signup);

export { userRouter };
