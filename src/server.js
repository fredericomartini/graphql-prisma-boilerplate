import { GraphQLServer } from 'graphql-yoga';
import prisma from './prisma';
import { resolvers, fragmentReplacements } from './resolvers';

// Create the server
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context({ request, response }) {
    return { request, response, prisma };
  },
  fragmentReplacements,
});

export { server as default };
