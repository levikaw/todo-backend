import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateTaskDto } from '../application/dtos/create-task.dto';
import { UpdateTaskDto } from '../application/dtos/update-task.dto';
import { TaskModel } from '../domain/models/task.model';
import { TaskMapper } from '../domain/task.mapper';
import { ITaskRepository } from '../domain/task.repository.interface';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async createTask(task: CreateTaskDto): Promise<TaskModel> {
    const entity = this.taskRepository.create(task);

    return this.taskRepository
      .save(entity)
      .then((resp) => TaskMapper.toDomain(resp));
  }

  async findTasks(usersIds: string[]): Promise<TaskModel[]> {
    return this.taskRepository
      .find({
        relations: ['author', 'assignedTo'],
        order: {
          updatedAt: 'DESC',
        },
        where: {
          assignedToId: In(usersIds),
        },
      })
      .then((tasks) => tasks.map((task) => TaskMapper.toDomain(task)));
  }

  async findTaskById(id: string): Promise<TaskModel> {
    return this.taskRepository
      .findOne({
        relations: ['author', 'assignedTo'],
        where: { id },
      })
      .then((task) => TaskMapper.toDomain(task));
  }

  async updateTask(id: string, task: UpdateTaskDto): Promise<void> {
    await this.taskRepository.update(id, task);
  }
}
