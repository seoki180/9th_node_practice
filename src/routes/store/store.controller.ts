import express from 'express';
import { StoreService } from './store.service';
import { AddReviewDto, AddStoreDto } from './store.dto';
import { Request, Response } from 'express';

const storeRouter = express.Router();
export class StoreController {
  static async addStore(req: Request, res: Response) {
    try {
      const addStoreDto: AddStoreDto = new AddStoreDto(req.body);
      const store = await StoreService.addStore(addStoreDto);
      res.successResponse('가게 생성 성공', store, 202);
    } catch (error: any) {
      res.failResponse('가게 생성 실패', error);
    }
  }

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
