import { IsString, IsNumber, IsDate, Max, validate } from 'class-validator';
import { Reviews } from '../../generated/prisma/client';

export class AddStoreDto {
  area_index!: string;
  name!: string;
  location!: string;
  lat!: string;
  lng!: string;
  store_index!: string;

  constructor(body: any) {
    this.area_index = body.area_index ?? '';
    this.name = body.name ?? '';
    this.location = body.location ?? '';
    this.lat = body.lat ?? '';
    this.lng = body.lng ?? '';
  }
}

export class AddReviewDto {
  @IsString()
  review_Index!: string;
  @IsString()
  store_Index!: string;
  @IsString()
  user_Index!: string;
  @IsString()
  contents!: string;
  @IsNumber()
  @Max(5)
  stars: number;
  @IsDate()
  created_at!: Date;

  constructor(body: any) {
    this.store_Index = body.store_Index;
    this.user_Index = body.user_Index;
    this.contents = body.contents;
    this.stars = body.stars ?? 0;
    this.created_at = new Date();
    // validate(this).then((errors) => {
    //   console.log(errors.map((error) => error.property));
    // });
  }
}
