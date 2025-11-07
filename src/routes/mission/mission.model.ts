import { prisma } from '../../config/prisma';
import { AddMissionDto, SelectMission, UpdateMissionDto } from './mission.dto';
import {
  Missions,
  User_Mission,
  User_Mission_mission_status
} from '../../generated/prisma/client';

export class MissionModel {
  static async insertMission(addMissionDto: AddMissionDto): Promise<Missions> {
    const {
      mission_index,
      store_index,
      area_index,
      contents,
      point,
      status,
      created_at
    } = addMissionDto;

    return await prisma.missions.create({
      data: {
        mission_Index: mission_index,
        store_Index: store_index,
        area_Index: area_index,
        contents,
        point,
        status,
        created_at
      }
    });
  }

  static async checkMission(updateMissionDto: UpdateMissionDto): Promise<any> {
    const { mission_Index } = updateMissionDto;

    const missions = await prisma.missions.findMany({
      select: {
        mission_Index: true,
        status: true,
        area_Index: true,
        store_Index: true
      },
      where: {
        mission_Index
      }
    });

    return missions;
  }

  static async updateMission(
    updateMissionDto: UpdateMissionDto
  ): Promise<User_Mission> {
    const {
      mission_Index,
      mission_status,
      area_Index,
      store_Index,
      user_Index
    } = updateMissionDto;

    return await prisma.user_Mission.upsert({
      where: {
        mission_Index_user_Index: {
          mission_Index,
          user_Index
        }
      },
      update: {
        mission_status: mission_status
      },
      create: {
        mission_Index,
        user_Index,
        store_Index,
        area_Index,
        mission_status: mission_status
      }
    });
  }
}
