import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ToDo } from '@prisma/client';

@Injectable()
export class TodoService {
  private readonly logger = new Logger(TodoService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async add(title: string, description: string): Promise<ToDo | null> {
    return await this.prismaService.toDo
      .create({
        data: {
          title,
          description,
          status: false,
        },
      })
      .catch((e) => {
        this.logger.error(e);
        return null;
      });
  }

  async update(id: string): Promise<ToDo | null> {
    const todo = await this.prismaService.toDo
      .findFirst({ where: { id } })
      .catch((e) => {
        this.logger.error(e);
        return null;
      });
    if (!todo) {
      this.logger.error(`Todo с ID ${id} не найдена`);
      return null;
    }
    const { status } = todo;
    return await this.prismaService.toDo
      .update({
        where: { id },
        data: {
          status: !status,
        },
      })
      .catch((e) => {
        this.logger.error(e);
        return null;
      });
  }
  async delete(id: string) {
    const todo = await this.prismaService.toDo
      .findFirst({ where: { id } })
      .catch((e) => {
        this.logger.error(e);
        return false;
      });
    if (!todo) {
      this.logger.error(`Todo с ID ${id} не найдена`);
      return false;
    }
    return await !!this.prismaService.toDo
      .delete({ where: { id } })
      .catch((e) => {
        this.logger.error(e);
        return false;
      });
  }

  async find(): Promise<ToDo[] | null> {
    return this.prismaService.toDo
      .findMany({ orderBy: { createdAt: 'desc' } })
      .catch((e) => {
        this.logger.error(e);
        return null;
      });
  }
}
