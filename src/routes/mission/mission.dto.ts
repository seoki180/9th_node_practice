import { Missions_status } from '../../generated/prisma/enums';
import { Missions } from '../../generated/prisma/client';

export class AddMissionDto {
  mission_index!: string;
  store_index!: string;
  area_index!: string;
  contents!: string;
  point!: number;
  status!: Missions_status;
  created_at!: Date;

  constructor(body: any) {
    this.store_index = body.store_index ?? '';
    this.area_index = body.area_index ?? '';
    this.contents = body.contents ?? '';
    this.point = body.point ?? 0;
    this.status = body.status ?? null;
  }
}

export class UpdateMissionDto {
  mission_Index!: string;
  mission_status!: Missions_status;
  area_Index!: string;
  store_Index!: string;
  user_Index!: string;

  constructor(body: any) {
    this.mission_Index = body.mission_Index ?? '';
    this.mission_status = body.mission_status ?? null;
    this.user_Index = body.user_Index ?? '';
  }
}

export interface SelectMission {
  mission_Index: string;
  mission_status: Missions_status;
  area_Index: string;
  store_Index: string;
  user_Index: string;
}
