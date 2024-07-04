import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRolesEntity } from './user-roles.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Имя */
  @Column()
  name: string;

  /** Отчество */
  @Column()
  surname: string;

  /** Фамилия */
  @Column()
  family: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @Column()
  roleId: string;

  @ManyToOne(() => UserRolesEntity)
  @JoinColumn({ name: 'roleId', referencedColumnName: 'id' })
  role: UserRolesEntity;
}
