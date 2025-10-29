const enum MissionStatus {
  pending,
  progress,
  done
}

export class AddMissionDto {
  mission_index!: string;
  store_index!: string;
  area_index!: string;
  contents!: string;
  point!: number;
  status!: MissionStatus;
  created_at!: Date;

  constructor(body: any) {
    this.store_index = body.store_index ?? '';
    this.area_index = body.area_index ?? '';
    this.contents = body.contents ?? '';
    this.point = body.point ?? 0;
    this.status = body.status ?? null;
  }
}
