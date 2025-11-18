import express from 'express';
import { Request, Response } from 'express';
import { AddMissionDto, UpdateMissionDto } from './mission.dto';
import { MissionService } from './mission.service';

const missionRouter = express.Router();

class MissionController {
  // {
  //     "store_index":"1234",
  //     "area_index":"test",
  //     "content":"10000원 이상의 식사를 하세요!",
  //     "point":50,
  //     "status":"pending"
  // }
  static async addMission(req: Request, res: Response) {
    try {
      const addMissionDto: AddMissionDto = new AddMissionDto(req.body);
      const mission = await MissionService.addMission(addMissionDto);
      res.successResponse('미션 생성 성공', mission, 201);
    } catch (error: any) {
      res.failResponse('미션 생성 실패', error);
    }
  }

  // {
  //     "mission_Index" : "01K8RAA94V3N9A4F1D6K000PZT",
  //     "user_Index":"1234",
  //     "mission_status" : "pending"
  // }
  static async startMission(req: Request, res: Response) {
    try {
      const startMissionDto: UpdateMissionDto = new UpdateMissionDto(req.body);
      await MissionService.startMission(startMissionDto);
      res.successResponse('미션 시작 성공', null, 204);
    } catch (error: any) {
      res.failResponse('미션 시작 실패', error);
    }
  }
}

missionRouter.post('/add', MissionController.addMission);
missionRouter.post('/start', MissionController.startMission);

export { missionRouter };
