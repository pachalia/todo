import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import { join } from 'path';
import {gqlErrorHandler} from "@libs/providers/graphql/error-handler";

export const apolloDriverConfig:ApolloDriverConfig = {
    driver: ApolloDriver,
    autoSchemaFile: join(
        process.cwd(),
        'libs',
        'providers',
        'src',
        'graphql',
        'schema.gql',
    ),
    playground: true,
    context: ({ req, res }) => ({ req, res }),
    formatError: gqlErrorHandler
}