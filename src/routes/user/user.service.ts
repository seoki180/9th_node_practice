import { ulid } from 'ulid';
import { SignupDTO } from './user.dto';
import { createHashedPassword } from '../../config/crypto';
import { UserModel } from './user.model';

export class UserService {
  public static async idCheckService(id: string): Promise<void> {
    const isDup =
      (await UserModel.selectUserInfo(id)).length > 0 ? true : false;
    if (isDup) {
      throw new Error('아이디가 중복됨');
    }
  }

  public static async signupService(signupDto: SignupDTO) {
    await UserService.idCheckService(signupDto.id);
    signupDto.user_Index = ulid();
    const { hashedPassword, userSalt } = await createHashedPassword(
      signupDto.password
    );
    signupDto.salt = userSalt;
    signupDto.password = hashedPassword;
    await UserModel.insertUser(signupDto);
  }
}
