import { isNotEmptyObject } from 'class-validator';
import { UserRolesEntity } from '../../infrastructure/entities/user-roles.entity';
import { UserRolesModel } from '../models/user-roles.model';

export class UserRoleMapper {
  static toDomain(role: UserRolesEntity): UserRolesModel | null {
    if (isNotEmptyObject(role)) {
      const roleModel = new UserRolesModel();
      roleModel.id = role.id;
      roleModel.alias = role.alias;

      return roleModel;
    } else {
      return null;
    }
  }
}
