import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRolesEntity } from './infrastructure/entities/user-roles.entity';
import { UserEntity } from './infrastructure/entities/user.entity';
import { UserController } from './application/user.controller';
import { UserService } from './application/user.service';
import { USER_REPOSITORY_SYMBOL } from './domain/interfaces/user.repository.interface';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { USER_ROLES_REPOSITORY_SYMBOL } from './domain/interfaces/user-roles.repository.interface';
import { UserRolesRepository } from './infrastructure/repositories/user-role.repository';
import { ADMIN_USER_REPOSITORY_SYMBOL } from './domain/interfaces/lnk-admin-user.repository.interface';
import { LnkAdminUserRepository } from './infrastructure/repositories/lnk-admin-user.repository';
import { LnkAdminUserEntity } from './infrastructure/entities/lnk-admin-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserRolesEntity, LnkAdminUserEntity]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY_SYMBOL,
      useClass: UserRepository,
    },
    {
      provide: ADMIN_USER_REPOSITORY_SYMBOL,
      useClass: LnkAdminUserRepository,
    },
    {
      provide: USER_ROLES_REPOSITORY_SYMBOL,
      useClass: UserRolesRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
