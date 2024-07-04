import { isNotEmptyObject } from 'class-validator';
import { TaskEntity } from '../infrastructure/entities/task.entity';
import { TaskModel } from './models/task.model';

export class TaskMapper {
  static toDomain(task: TaskEntity): TaskModel | null {
    if (isNotEmptyObject(task)) {
      const taskModel = new TaskModel();
      taskModel.id = task.id;
      taskModel.title = task.title;
      taskModel.createdAt = task.createdAt;
      taskModel.updatedAt = task.updatedAt;
      taskModel.expiredAt = task.expiredAt;
      taskModel.title = task.title;
      taskModel.description = task.description;
      taskModel.priority = task.priority;
      taskModel.status = task.status;
      taskModel.author = task.author;
      taskModel.assignedTo = task.assignedTo;

      return taskModel;
    } else {
      return null;
    }
  }
}
