import { prisma } from '../../config/prisma';
import { AddReviewDto, AddStoreDto } from './store.dto';
import { Stores, Reviews } from '../../generated/prisma/client';

export class StoreModel {
  static async selectStore(addReviewDto: AddReviewDto): Promise<Stores | null> {
    const { store_Index } = addReviewDto;
    return await prisma.stores.findFirst({
      where: {
        store_Index
      }
    });
  }

  static async insertStore(addStoreDto: AddStoreDto): Promise<Stores> {
    const { store_index, area_index, name, location, lat, lng } = addStoreDto;
    return await prisma.stores.create({
      data: {
        store_Index: store_index,
        area_Index: area_index,
        name,
        location,
        lat,
        lng,
        created_at: new Date()
      }
    });
  }

  static async insertReview(addReviewDto: AddReviewDto): Promise<Reviews> {
    const { review_Index, store_Index, user_Index, contents, stars } =
      addReviewDto;

    return await prisma.reviews.create({
      data: {
        review_Index,
        store_Index,
        user_Index,
        contents,
        stars,
        create_at: new Date()
      }
    });
  }
}
