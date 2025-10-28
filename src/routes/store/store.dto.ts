// 보통 NestJS나 타입 기반 DTO 생성이 필요한 경우 class를 사용합니다.
// class를 사용하면 validation, transformation(like class-validator, class-transformer) 라이브러리를 쉽게 쓸 수 있습니다.
// 하지만 타입체크만 필요하면 interface도 무방합니다.
// 실무적으로는 확장성/유연성 및 데코레이터를 이용한 검증 로직을 위해 class가 더 많이 쓰입니다.

// 예시: class 기반 DTO
export class AddStoreDto {
  area_index!: string;
  name!: string;
  location!: string;
  lat!: number;
  lng!: number;
  store_index!: string;

  constructor(body: any) {
    this.area_index = body.area_index ?? '';
    this.name = body.name ?? '';
    this.location = body.location ?? '';
    this.lat = body.lat ?? 0;
    this.lng = body.lng ?? 0;
    // DTO에서 에러를 발생시키는 건 흔하지 않습니다.
    // 일반적으로 DTO는 데이터 구조/타입 정의에 집중하고, 유효성 검증/에러 처리는 service 또는 middleware 레이어에서 처리합니다.
    // 단, 엄격한 값 체크가 필요하다면 예외적으로 DTO에서 에러를 throw할 수도 있지만, 일반적으로는 class-validator 등의 라이브러리를 활용합니다.
  }
}

// --- 또는 interface로도 작성 가능 ---
// export interface AddStoreDto {
//   area_index: string;
//   name: string;
//   location: string;
//   latitude: number;
//   longitude: number;
// }
