import pool from '../../config/db';
import { AddMissionDto } from './mission.dto';

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
}
