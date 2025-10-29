import pool from '../../config/db';
import { SignupDTO } from './user.dto';

export class UserModel {
  static async selectUserInfo(id: string): Promise<any> {
    const queryString = process.env.SELECT_USER_INFO_Q;
    const query: string = queryString ?? '';
    return new Promise((resolve, reject) => {
      pool.query(query, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async insertUser(signupDto: SignupDTO) {
    const queryString = process.env.INSERT_USER_Q;
    const query: string = queryString ?? '';
    const {
      user_Index,
      name,
      id,
      password,
      salt,
      email,
      birthday,
      address,
      gender,
      point,
      profile_url,
      phone
    } = signupDto;
    return new Promise((resolve, reject) => {
      pool.query(
        query,
        [
          user_Index,
          name,
          id,
          password,
          salt,
          email,
          birthday,
          address,
          gender,
          point,
          profile_url,
          phone
        ],
        (err, result) => {
          if (err) reject(err);
          else resolve(result as any);
        }
      );
    });
  }
}
