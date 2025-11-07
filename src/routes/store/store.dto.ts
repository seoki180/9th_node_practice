// 보통 NestJS나 타입 기반 DTO 생성이 필요한 경우 class를 사용합니다.
// class를 사용하면 validation, transformation(like class-validator, class-transformer) 라이브러리를 쉽게 쓸 수 있습니다.
// 하지만 타입체크만 필요하면 interface도 무방합니다.
// 실무적으로는 확장성/유연성 및 데코레이터를 이용한 검증 로직을 위해 class가 더 많이 쓰입니다.

// 예시: class 기반 DTO

import { IsString, IsNumber, IsDate, Max, validate } from 'class-validator';
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
