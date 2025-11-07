import { prisma } from '../../config/prisma';
import { SignupDTO } from './user.dto';
import { Users } from '../../generated/prisma/client';

export class UserModel {
  static async selectUserInfo(id: string): Promise<boolean> {
    const check = await prisma.users.findFirst({
      where: {
        id: id
      }
    });
    return check == null ? false : true;
  }

  static async insertUser(signupDto: SignupDTO): Promise<Users> {
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

    return await prisma.users.create({
      data: {
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
      }
    });
  }
}
