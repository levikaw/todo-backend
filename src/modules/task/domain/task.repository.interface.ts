import { CreateTaskDto } from '../application/dtos/create-task.dto';
import { UpdateTaskDto } from '../application/dtos/update-task.dto';
import { TaskModel } from './models/task.model';

export interface ITaskRepository {
  createTask(task: CreateTaskDto): Promise<TaskModel>;
  findTasks(usersIds: string[]): Promise<TaskModel[]>;
  updateTask(id: string, task: UpdateTaskDto): Promise<void>;
  findTaskById(id: string): Promise<TaskModel>;
}

export const TASK_REPOSITORY_SYMBOL = Symbol('ITaskRepository');
