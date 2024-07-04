import { isNotEmptyObject } from 'class-validator';
import { LnkAdminUserEntity } from '../../infrastructure/entities/lnk-admin-user.entity';
import { LnkAdminUserModel } from '../models/lnk-admin-user.model';

export class LnkAdminUserMapper {
  static toDomain(lnkAdminUser: LnkAdminUserEntity): LnkAdminUserModel | null {
    if (isNotEmptyObject(lnkAdminUser)) {
      const model = new LnkAdminUserModel();
      model.id = lnkAdminUser.id;
      model.adminId = lnkAdminUser.adminId;
      model.userId = lnkAdminUser.userId;

      return model;
    } else {
      return null;
    }
  }
}
