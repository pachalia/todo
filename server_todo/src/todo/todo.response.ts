import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TodoResponse {
  @Field(() => ID, { description: 'ID todo' })
  id: string;

  @Field({ description: 'Заголовок Todo' })
  title: string;

  @Field({ description: 'Описание Todo' })
  description: string;

  @Field(() => Boolean, { description: 'Выполнен todo или нет' })
  status: boolean;

  @Field({ description: 'Дата создания todo' })
  createdAt: string;
}
