import { ulid } from 'ulid';
import { StoreModel } from './store.model';
import { AddReviewDto, AddStoreDto } from './store.dto';
import { StoreNotFoundError } from '../../middleware/error';

export class StoreService {
  public static async addStore(addStoreDto: AddStoreDto) {
    addStoreDto.store_index = ulid();
    const store = await StoreModel.insertStore(addStoreDto);
    return addStoreDto;
  }

  public static async addReview(addReviewDto: AddReviewDto) {
    const check = await StoreModel.selectStore(addReviewDto);
    if (!check) throw new StoreNotFoundError();
    addReviewDto.review_Index = ulid();
    const review = await StoreModel.insertReview(addReviewDto);

    return addReviewDto;
  }
}
