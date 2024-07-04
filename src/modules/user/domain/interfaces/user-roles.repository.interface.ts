import { UserRolesModel } from '../models/user-roles.model';

export interface IUserRolesRepository {
  findRoleByAlias(alias: string): Promise<UserRolesModel | null>;
}

export const USER_ROLES_REPOSITORY_SYMBOL = Symbol('IUserRolesRepository');
