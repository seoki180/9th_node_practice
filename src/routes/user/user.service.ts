import { ulid } from 'ulid';
import { SignupDTO } from './user.dto';
import { createHashedPassword } from '../../config/crypto';
import { UserModel } from './user.model';
import { DuplicatedError } from '../../middleware/error';

export class UserService {
  public static async idCheckService(id: string): Promise<void> {
    const isDup = await UserModel.selectUserInfo(id);
    if (isDup) {
      throw new DuplicatedError();
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
