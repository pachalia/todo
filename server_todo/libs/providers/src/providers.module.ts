import { Module } from '@nestjs/common';
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriverConfig} from "@nestjs/apollo";
import {apolloDriverConfig} from "@libs/providers/graphql";


@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>(apolloDriverConfig)]
})
export class ProvidersModule {}
