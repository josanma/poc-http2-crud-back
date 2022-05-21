import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  create(createTodoDto: CreateTodoDto) {
    const todo: Todo = {
      id: this.todos.length + 1,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...createTodoDto,
    };
    this.todos.push(todo);
    return todo;
  }

  findAll() {
    return this.todos;
  }

  findOne(id: number) {
    return this.todos.find((todo) => todo.id === id);
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = this.findOne(id);
    if (todo) {
      todo.title = updateTodoDto.title;
      todo.completed = updateTodoDto.completed;
      todo.updatedAt = new Date();
    }
    return todo;
  }

  remove(id: number) {
    return this.todos.splice(
      this.todos.findIndex((todo) => todo.id === id),
      1,
    );
  }
}
