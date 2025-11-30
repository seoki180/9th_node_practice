import express from 'express';
import { UserService } from './user.service';
import { SignupDTO } from './user.dto';
import { Request, Response } from 'express';
import passport from 'passport';
import { User } from '../../config/passport';

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

  static async googleLoginPage(req: Request, res: Response) {
    if (req.isAuthenticated() && req.user) {
      // 로그인된 경우: 사용자 정보 표시 및 로그아웃 버튼
      const user = req.user as User;
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>로그인 성공</title>
        </head>
        <body>
          <h1>로그인 성공!</h1>
          <div style="margin: 20px 0;">
            <p><strong>사용자 ID:</strong> ${user.id}</p>
            <p><strong>이름:</strong> ${user.name || 'N/A'}</p>
            <p><strong>이메일:</strong> ${user.email || 'N/A'}</p>
            <p><strong>프로필 사진:</strong><br>
              ${
                user.picture
                  ? `<img src="${user.picture}" alt="프로필 사진" style="width:80px;height:80px;border-radius:50%;margin-top:8px;">`
                  : 'N/A'
              }
            </p>
          </div>
          <a href="/api/user/logout">
            <button style="background:#dc3545;color:#fff;border:none;padding:12px 18px;border-radius:4px;font-size:16px;cursor:pointer;">
              로그아웃
            </button>
          </a>
        </body>
        </html>
      `);
    } else {
      // 로그인 안 된 경우: 로그인 버튼 표시
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>구글 로그인</title>
        </head>
        <body>
          <h1>Google 로그인</h1>
          <a href="/api/user/google">
            <button style="background:#4285F4;color:#fff;border:none;padding:12px 18px;border-radius:4px;font-size:16px;cursor:pointer;">
              Google 계정으로 로그인
            </button>
          </a>
        </body>
        </html>
      `);
    }
  }
}

userRouter.post('/signup', UserController.signup);
userRouter.get('/login', UserController.googleLoginPage);
userRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
); // 프로파일과 이메일 정보를 받는다.
userRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/failure' }), //? 그리고 passport 로그인 전략에 의해 googleStrategy로 가서 구글계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
  (req, res) => {
    res.redirect('/api/user/login');
  }
);
userRouter.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('로그아웃 중 오류가 발생했습니다.');
    }
    res.redirect('/api/user/login');
  });
});

export { userRouter };
