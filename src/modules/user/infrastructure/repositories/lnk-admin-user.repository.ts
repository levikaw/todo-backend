import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ILnkAdminUserRepository } from '../../domain/interfaces/lnk-admin-user.repository.interface';
import { LnkAdminUserEntity } from '../entities/lnk-admin-user.entity';
import { LnkAdminUserModel } from '../../domain/models/lnk-admin-user.model';
import { LnkAdminUserMapper } from '../../domain/mappers/lnk-admin-user.mapper';
import { CreateAdminUserDto } from '../../application/dtos/create-admin-user.dto';

@Injectable()
export class LnkAdminUserRepository implements ILnkAdminUserRepository {
  constructor(
    @InjectRepository(LnkAdminUserEntity)
    private readonly lnkAdminUserRepository: Repository<LnkAdminUserEntity>,
  ) {}

  async save(model: CreateAdminUserDto): Promise<LnkAdminUserModel> {
    const entity = this.lnkAdminUserRepository.create(model);
    return this.lnkAdminUserRepository
      .save(entity)
      .then((resp) => LnkAdminUserMapper.toDomain(resp));
  }

  async findUsersByAdminId(adminId: string): Promise<LnkAdminUserModel[]> {
    return this.lnkAdminUserRepository
      .findBy({ adminId })
      .then((resp) => resp.map((user) => LnkAdminUserMapper.toDomain(user)));
  }

  async findAdminByUserId(userId: string): Promise<LnkAdminUserModel | null> {
    return this.lnkAdminUserRepository
      .findOneBy({ userId })
      .then((resp) => LnkAdminUserMapper.toDomain(resp));
  }
}
