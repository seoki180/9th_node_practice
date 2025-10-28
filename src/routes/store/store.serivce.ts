import { ulid } from 'ulid';
import { StoreModel } from './store.model';
import { AddStoreDto } from './store.dto';

export class StoreService {
  public static async addStore(addStoreDto: AddStoreDto) {
    addStoreDto.store_index = ulid();
    const store = await StoreModel.insertStore(addStoreDto);

    return addStoreDto;
  }
}
