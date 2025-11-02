import pool from '../../config/db';
import { AddReviewDto, AddStoreDto } from './store.dto';

export class StoreModel {
  static async selectStore(addReviewDto: AddReviewDto): Promise<any> {
    const queryString = process.env.SELECT_STORE_Q;
    const query: string = queryString ?? '';

    const { store_Index } = addReviewDto;
    return new Promise((resolve, reject) => {
      pool.query(query, [store_Index], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async insertStore(addStoreDto: AddStoreDto) {
    const queryString = process.env.INSERT_STORE_Q;
    const query: string = queryString ?? '';
    const { store_index, area_index, name, location, lat, lng } = addStoreDto;

    return new Promise((resolve, reject) => {
      pool.query(
        query,
        [store_index, area_index, name, location, lat, lng],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  }
  static async insertReview(addReviewDto: AddReviewDto) {
    const queryString = process.env.INSERT_REVIEW_Q;
    const query: string = queryString ?? '';
    const { review_Index, store_Index, user_Index, contents, stars } =
      addReviewDto;
    return new Promise((resolve, reject) => {
      pool.query(
        query,
        [review_Index, store_Index, user_Index, contents, stars],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  }
}
