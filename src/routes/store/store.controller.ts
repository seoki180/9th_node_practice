import express from 'express';
import { StoreService } from './store.service';
import { AddReviewDto, AddStoreDto } from './store.dto';
import { Request, Response } from 'express';

const storeRouter = express.Router();
class StoreController {
  // {
  //  "area_index": "test",
  //  "name": "박지혜순대국",
  //  "location":"인하대",
  //  "lat":12,
  //  "lng":12
  // }
  static async addStore(req: Request, res: Response) {
    try {
      const addStoreDto: AddStoreDto = new AddStoreDto(req.body);
      const store = await StoreService.addStore(addStoreDto);
      res.successResponse('가게 생성 성공', store, 202);
    } catch (error: any) {
      res.failResponse('가게 생성 실패', error);
    }
  }

  // {
  //   "store_Index": "01K8RAA94V3N9A4F1D6K000PZT",
  //   "user_Index": "01K8RAA94V3N9A4F1D6K000PZT",
  //   "contents": "test",
  //   "stars": 5
  // }
  static async addReview(req: Request, res: Response) {
    try {
      const addReviewDto: AddReviewDto = new AddReviewDto(req.body);
      const review = await StoreService.addReview(addReviewDto);
      res.successResponse('리뷰 생성 성공', review, 202);
    } catch (error: any) {
      res.failResponse('리뷰 생성 실패', error);
    }
  }
}

storeRouter.post('/add', StoreController.addStore);
storeRouter.post('/review/add', StoreController.addReview);
export { storeRouter };
