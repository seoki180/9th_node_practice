import { ulid } from 'ulid';
import { AddMissionDto } from './mission.dto';
import { MissionModel } from './mission.model';

export class MissionService {
  public static async addMission(addMissionDto: AddMissionDto) {
    addMissionDto.mission_index = ulid();
    addMissionDto.created_at = new Date();
    const mission = await MissionModel.insertMission(addMissionDto);
    return mission;
  }
}
