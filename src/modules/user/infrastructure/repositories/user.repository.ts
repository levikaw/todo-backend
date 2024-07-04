import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
// import { Transactional } from 'typeorm-transactional';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { UserModel } from '../../domain/models/user.model';
import { UserMapper } from '../../domain/mappers/user.mapper';
import { IUserRepository } from '../../domain/interfaces/user.repository.interface';
import { generateHash } from '../../domain/utils';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: CreateUserDto): Promise<UserModel> {
    user.password = await generateHash(user.password);
    const entity = this.userRepository.create(user);

    return this.userRepository
      .save(entity)
      .then((resp) => UserMapper.toDomain(resp));
  }

  async findUserById(id: string): Promise<UserModel | null> {
    return this.userRepository
      .findOne({
        relations: ['role'],
        where: { id },
      })
      .then((resp) => UserMapper.toDomain(resp));
  }

  async findUserByLogin(login: string): Promise<UserModel | null> {
    return this.userRepository
      .findOne({
        relations: ['role'],
        where: { login },
      })
      .then((resp) => UserMapper.toDomain(resp));
  }

  async findUsers(ids: string[]): Promise<UserModel[]> {
    return this.userRepository
      .find({
        relations: ['role'],
        where: { id: In(ids) },
      })
      .then((resp) => resp.map((user) => UserMapper.toDomain(user)));
  }
}
