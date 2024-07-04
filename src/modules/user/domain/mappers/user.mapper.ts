import { isNotEmptyObject } from 'class-validator';
import { UserEntity } from '../../infrastructure/entities/user.entity';
import { UserModel } from '../models/user.model';

export class UserMapper {
  static toDomain(user: UserEntity): UserModel | null {
    if (isNotEmptyObject(user)) {
      const userModel = new UserModel();
      userModel.id = user.id;
      userModel.name = user.name;
      userModel.surname = user.surname;
      userModel.family = user.family;
      userModel.role = user.role;
      userModel.login = user.login;
      userModel.password = user.password;

      return userModel;
    } else {
      return null;
    }
  }
}
