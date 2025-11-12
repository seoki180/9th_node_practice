import { ulid } from 'ulid';
import { AddMissionDto, SelectMission, UpdateMissionDto } from './mission.dto';
import { MissionModel } from './mission.model';
import { MissionNotFoundError } from '../../middleware/error';

export class MissionService {
  public static async addMission(addMissionDto: AddMissionDto) {
    addMissionDto.mission_index = ulid();
    addMissionDto.created_at = new Date();
    const mission = await MissionModel.insertMission(addMissionDto);
    return mission;
  }

  public static async startMission(updateMissionDto: UpdateMissionDto) {
    const checkMission: SelectMission[] = await MissionModel.checkMission(
      updateMissionDto
    );

    if (!Array.isArray(checkMission) || checkMission.length === 0) {
      throw new MissionNotFoundError();
    }
    const { mission_Index, area_Index, store_Index } = checkMission[0];

    updateMissionDto = {
      ...updateMissionDto,
      mission_Index,
      area_Index,
      store_Index
    };

    await MissionModel.updateMission(updateMissionDto);
  }
}
