import express from 'express';
import { StoreService } from './store.serivce';
import { AddStoreDto } from './store.dto';
import { Request, Response } from 'express';
import { ResponseBase } from '../../config/response';

const storeRouter = express.Router();
class StoreController {
  static async addStore(req: Request, res: Response) {
    try {
      const addStoreDto: AddStoreDto = new AddStoreDto(req.body);
      const store = await StoreService.addStore(addStoreDto);

      res.json(
        new ResponseBase({
          resultType: 'SUCCESS',
          data: store,
          message: '가게 생성 성공'
        })
      );
    } catch (error: any) {
      console.log(error);
      res.status(500).json(
        new ResponseBase({
          resultType: 'FAIL',
          data: null,
          message: '가게 생성 실패',
          error: error.message
        })
      );
    }
  }
}

storeRouter.post('/add', StoreController.addStore);

export { storeRouter };
