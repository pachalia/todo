import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { TodoResponse } from './todo.response';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}
  @Mutation(() => TodoResponse, { nullable: true })
  create(
    @Args('title') title: string,
    @Args('description') description: string,
  ) {
    return this.todoService.add(title, description);
  }
  @Mutation(() => TodoResponse, { nullable: true })
  update(@Args('id') id: string) {
    return this.todoService.update(id);
  }
  @Mutation(() => Boolean)
  delete(@Args('id') id: string) {
    return this.todoService.delete(id);
  }
  @Query(() => [TodoResponse], { nullable: true })
  getTodo() {
    return this.todoService.find();
  }
}
