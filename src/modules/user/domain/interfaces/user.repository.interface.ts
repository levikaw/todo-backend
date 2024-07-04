import { type CreateUserDto } from '../../application/dtos/create-user.dto';
import { type UserModel } from '../models/user.model';

export interface IUserRepository {
  createUser(user: CreateUserDto): Promise<UserModel>;
  findUsers(ids: string[]): Promise<UserModel[]>;
  findUserById(id: string): Promise<UserModel | null>;
  findUserByLogin(login: string): Promise<UserModel | null>;
}

export const USER_REPOSITORY_SYMBOL = Symbol('IUserRepository');
