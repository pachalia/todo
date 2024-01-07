import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import {ConfigModule} from "@nestjs/config";
import {ProvidersModule} from "@libs/providers";
import {TodoResolver} from "./todo/todo.resolver";
import {TodoService} from "./todo/todo.service";


@Module({
  imports: [TodoModule,ConfigModule.forRoot({isGlobal:true}), ProvidersModule],
  controllers: [],
  providers: [TodoResolver, TodoService],
})
export class AppModule {}
