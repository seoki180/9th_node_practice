import express from 'express';
import { Request, Response } from 'express';
import { AddMissionDto, UpdateMissionDto } from './mission.dto';
import { MissionService } from './mission.service';

const missionRouter = express.Router();

export class MissionController {
  static async addMission(req: Request, res: Response) {
    try {
      const addMissionDto: AddMissionDto = new AddMissionDto(req.body);
      const mission = await MissionService.addMission(addMissionDto);
      res.successResponse('미션 생성 성공', mission, 201);
    } catch (error: any) {
      res.failResponse('미션 생성 실패', error);
    }
  }

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
