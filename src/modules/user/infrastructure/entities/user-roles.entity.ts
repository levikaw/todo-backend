import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ROLE_ALIAS } from '../constants';
import { RoleAliasType } from '../types';

@Entity('roles')
export class UserRolesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    type: 'enum',
    enum: [ROLE_ALIAS.ADMIN, ROLE_ALIAS.USER],
    default: ROLE_ALIAS.USER,
  })
  alias: RoleAliasType;
}
