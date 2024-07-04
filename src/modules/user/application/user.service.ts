import { Inject, Injectable } from '@nestjs/common';
import { UserModel } from '../domain/models/user.model';
import {
  IUserRepository,
  USER_REPOSITORY_SYMBOL,
} from '../domain/interfaces/user.repository.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import {
  IUserRolesRepository,
  USER_ROLES_REPOSITORY_SYMBOL,
} from '../domain/interfaces/user-roles.repository.interface';
import { isNotEmpty } from 'class-validator';
import { randomUUID } from 'crypto';
import {
  ADMIN_USER_REPOSITORY_SYMBOL,
  ILnkAdminUserRepository,
} from '../domain/interfaces/lnk-admin-user.repository.interface';
import { LnkAdminUserModel } from '../domain/models/lnk-admin-user.model';
import { ROLE_ALIAS } from '../infrastructure/constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY_SYMBOL)
    private readonly userRepository: IUserRepository,

    @Inject(ADMIN_USER_REPOSITORY_SYMBOL)
    private readonly lnkAdminUserRepository: ILnkAdminUserRepository,

    @Inject(USER_ROLES_REPOSITORY_SYMBOL)
    private readonly userRolesRepository: IUserRolesRepository,
  ) {}

  async findUserById(id: string): Promise<UserModel | null> {
    return this.userRepository.findUserById(id);
  }

  async findUserByLogin(login: string): Promise<UserModel | null> {
    return this.userRepository.findUserByLogin(login);
  }

  async createUser(user: CreateUserDto): Promise<UserModel> {
    if (!isNotEmpty(user.roleId)) {
      const { id } = await this.userRolesRepository.findRoleByAlias('user');
      user.roleId = id;
      user.name = 'name' + randomUUID();
      user.surname = 'surname' + randomUUID();
      user.family = 'family' + randomUUID();
      user.family = 'family' + randomUUID();
    }

    const newUser = await this.userRepository.createUser(user);
    const { id } = await this.userRepository.findUserByLogin('admin');

    await this.lnkAdminUserRepository.save({
      adminId: id,
      userId: newUser.id,
    });

    return newUser;
  }

  async findUsers(ids: string[]): Promise<UserModel[]> {
    return this.userRepository.findUsers(ids);
  }

  async findUsersByAdminId(adminId: string): Promise<LnkAdminUserModel[]> {
    return this.lnkAdminUserRepository.findUsersByAdminId(adminId);
  }

  async checkRights(
    userId: string,
    role: string,
    assignedToId: string,
  ): Promise<void> {
    const slaves = await this.findUsersByAdminId(userId);
    if (
      // если пользователь не админ, то можно присваивать задачи только себе
      (role === ROLE_ALIAS.USER && assignedToId !== userId) ||
      // если пользователь админ, то можно присваивать задачи себе и подчиненным
      (role === ROLE_ALIAS.ADMIN &&
        !slaves.map((slave) => slave.userId).includes(assignedToId))
    ) {
      throw new Error('Cannot assign to this user');
    }
  }
}
