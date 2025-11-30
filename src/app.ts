import './env';
import express from 'express';
import cors from 'cors';
import { StoreController, storeRouter } from './routes/store/store.controller';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import passport from 'passport';
import session from 'express-session';
import morgan from 'morgan';
import { errorHandler, notFound } from './middleware/error';
import { missionRouter } from './routes/mission/mission.controller';
import { userRouter } from './routes/user/user.controller';
import { responseHandler } from './config/response';
import swaggerSetup from './config/swagger';
import { passportConfig } from './config/passport';

const app = express();
const port = process.env.EC2_PORT || 3000;

passportConfig;
app.use(responseHandler);
app.use(cors());
app.use(express.json()); // JSON 본문을 파싱
app.use(express.urlencoded({ extended: true })); // HTML Form에서 전송된 데이터를 파싱
app.use(morgan('dev')); // HTTP Req 요청 로그 출력
app.use(
  session({
    secret: 'keyeky',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24시간
    }
  })
);
app.use(passport.initialize()); // 요청 객체에 passport 설정을 심음
app.use(passport.session()); // req.session 객체에 passport정보를 추가 저장

app.use('/api/store', storeRouter);
app.use('/api/mission', missionRouter);
app.use('/api/user', userRouter);
swaggerSetup(app);
// 에러 처리
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Sever is running on port ${port}`);
});
