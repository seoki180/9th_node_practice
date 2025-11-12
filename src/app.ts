import './env';
import express from 'express';
import cors from 'cors';
import { storeRouter } from './routes/store/store.controller';
import morgan from 'morgan';
import { errorHandler, notFound } from './middleware/error';
import { missionRouter } from './routes/mission/mission.controller';
import { userRouter } from './routes/user/user.controller';
import { responseHandler } from './config/response';

const app = express();
const port = process.env.EC2_PORT || 3000;

app.use(responseHandler);
app.use(cors());
app.use(express.json()); // JSON 본문을 파싱
app.use(express.urlencoded({ extended: true })); // HTML Form에서 전송된 데이터를 파싱
app.use(morgan('dev')); // HTTP Req 요청 로그 출력

// //라우터 설정

app.use('/api/store', storeRouter);
app.use('/api/mission', missionRouter);
app.use('/api/user', userRouter);
// 에러 처리
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Sever is running on port ${port}`);
});
