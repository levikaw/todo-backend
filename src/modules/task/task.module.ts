import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { TaskController } from './application/task.controller';
import { TaskService } from './application/task.service';
import { TASK_REPOSITORY_SYMBOL } from './domain/task.repository.interface';
import { TaskEntity } from './infrastructure/entities/task.entity';
import { TaskRepository } from './infrastructure/task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), UserModule],
  controllers: [TaskController],
  providers: [
    TaskService,
    {
      provide: TASK_REPOSITORY_SYMBOL,
      useClass: TaskRepository,
    },
  ],
})
export class TaskModule {}
