import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRolesEntity } from '../entities/user-roles.entity';
import { IUserRolesRepository } from '../../domain/interfaces/user-roles.repository.interface';
import { UserRolesModel } from '../../domain/models/user-roles.model';
import { UserRoleMapper } from '../../domain/mappers/user-role.mapper';
import { RoleAliasType } from '../types';

@Injectable()
export class UserRolesRepository implements IUserRolesRepository {
  constructor(
    @InjectRepository(UserRolesEntity)
    private readonly userRolesRepository: Repository<UserRolesEntity>,
  ) {}

  async findRoleByAlias(alias: RoleAliasType): Promise<UserRolesModel | null> {
    return this.userRolesRepository
      .findOneBy({ alias })
      .then((resp) => UserRoleMapper.toDomain(resp));
  }
}
