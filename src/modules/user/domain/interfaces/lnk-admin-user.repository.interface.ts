import { CreateAdminUserDto } from '../../application/dtos/create-admin-user.dto';
import { LnkAdminUserModel } from '../models/lnk-admin-user.model';

export interface ILnkAdminUserRepository {
  findUsersByAdminId(adminId: string): Promise<LnkAdminUserModel[]>;
  findAdminByUserId(userId: string): Promise<LnkAdminUserModel | null>;
  save(model: CreateAdminUserDto): Promise<LnkAdminUserModel>;
}

export const ADMIN_USER_REPOSITORY_SYMBOL = Symbol('ILnkAdminUserRepository');
