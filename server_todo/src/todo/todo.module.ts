import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TodoService } from './todo.service';

@Module({
  imports: [PrismaModule],
  providers: [TodoService],
})
export class TodoModule {}
