import { UserEntity } from 'src/modules/user/infrastructure/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PRIORITY_NAMES, STATUS_NAMES } from '../constants';
import { PriorityType, StatusType } from '../types';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  expiredAt: Date;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: [PRIORITY_NAMES.HIGH, PRIORITY_NAMES.MEDIUM, PRIORITY_NAMES.LOW],
    default: PRIORITY_NAMES.MEDIUM,
  })
  priority: PriorityType;

  @Column({
    type: 'enum',
    enum: [
      STATUS_NAMES.BACKLOG,
      STATUS_NAMES.CANCELED,
      STATUS_NAMES.DONE,
      STATUS_NAMES.PROGRESS,
    ],
    default: STATUS_NAMES.BACKLOG,
  })
  status: StatusType;

  @Column()
  authorId: string;

  @Column()
  assignedToId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'authorId', referencedColumnName: 'id' })
  author: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'assignedToId', referencedColumnName: 'id' })
  assignedTo: UserEntity;
}
