import { QueryResult, RowDataPacket } from 'mysql2';
import pool from '../../config/db';
import { AddMissionDto, SelectMission, UpdateMissionDto } from './mission.dto';

export class MissionModel {
  static async insertMission(addMissionDto: AddMissionDto) {
    const queryString = process.env.INSERT_MISSION_Q;
    const query: string = queryString ?? '';
    const {
      mission_index,
      store_index,
      area_index,
      contents,
      point,
      status,
      created_at
    } = addMissionDto;

    return new Promise((resolve, reject) => {
      pool.query(
        query,
        [
          mission_index,
          store_index,
          area_index,
          contents,
          point,
          status,
          created_at
        ],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  }

  static async checkMission(
    updateMissionDto: UpdateMissionDto
  ): Promise<SelectMission[]> {
    const queryString = process.env.SELECT_MISSION_Q;
    const query: string = queryString ?? '';

    const { mission_Index } = updateMissionDto;

    return new Promise((resolve, reject) => {
      pool.query<RowDataPacket[]>(query, [mission_Index], (err, result) => {
        if (err) reject(err);
        else resolve(result as SelectMission[]);
      });
    });
  }

  static async updateMission(
    updateMissionDto: UpdateMissionDto
  ): Promise<void> {
    const queryString = process.env.UPDATE_MISSION_Q;
    const query: string = queryString ?? '';

    const {
      mission_Index,
      mission_status,
      area_Index,
      store_Index,
      user_Index
    } = updateMissionDto;

    return new Promise((resolve, reject) => {
      pool.query(
        query,
        [mission_Index, user_Index, mission_status, area_Index, store_Index],
        (err, result) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }
}
