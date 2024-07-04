import { UserEntity } from '../../infrastructure/entities/user.entity';

export class LnkAdminUserModel {
  id: string;
  adminId: string;
  userId: string;
  admin: UserEntity;
  user: UserEntity;
}
