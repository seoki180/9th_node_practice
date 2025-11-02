import { ulid } from 'ulid';
import { StoreModel } from './store.model';
import { AddReviewDto, AddStoreDto } from './store.dto';

export class StoreService {
  public static async addStore(addStoreDto: AddStoreDto) {
    addStoreDto.store_index = ulid();
    const store = await StoreModel.insertStore(addStoreDto);

    return addStoreDto;
  }
  public static async addReview(addReviewDto: AddReviewDto) {
    addReviewDto.review_Index = ulid();
    const review = await StoreModel.insertReview(addReviewDto);

    return addReviewDto;
  }
}
