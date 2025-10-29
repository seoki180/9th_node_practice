import pool from '../../config/db';
import { AddStoreDto } from './store.dto';

export class StoreModel {
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
}
